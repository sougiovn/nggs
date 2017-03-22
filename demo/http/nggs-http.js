/**
 * It's a component to generate http methods easily with really few code
 *
 * It only accepts GET, POST, PUT and DELETE HTTP's methods
 *
 * Unless GET, all other methods accepts PAYLOAD
 *
 * The priority smart parameters order is: URL VARIABLE, PAYLOAD, QUERY PARAMS and $http CONFIG PROPERTIES
 *
 * Usage:
 *
 * var baseUrl = 'http://www.mydomain.com/api';
 *
 * var functions = [
 *  ['getUsersPage@get=/user', {params:{page:0, size:10}}],
 *  'getUser@get=/user/:id',
 *  'saveUser@post=/user',
 *  'updateUser@put=/user/:id',
 *  'deleteUser@delete=/user/:id'
 * ];
 * === OR ===
 * var functions = {
 *  getUsersPage: ['@get=/user', {params:{page:0, size:10}}],
 *  getUser: '@get=/user/:id',
 *  saveUser: '@post=/user',
 *  updateUser: '@put=/user/:id',
 *  deleteUser: '@delete=/user/:id'
 * };
 *
 * var api = ggHttp(baseUrl, functions, objectToAppendFunctions)
 *
 * api.getUser({id: 1})
 * api.getUsersPage()
 * api.saveUser({ name: 'New User' })
 * api.updateUser({ id: 2 }, { name: 'New Awesome User' })
 * api.deleteUser({ id: 1 })
 */
(function () {
  'use strict';

  var http = angular.module('nggs.http', []);

  http.provider('ggHttpConfig', ggHttpConfigProvider);

  function ggHttpConfigProvider() {
    var provider = this;

    var defaults = {};

    provider.$get = function () {
      return provider;
    };

    provider.setDefaults = setDefaults;
    provider.getDefaults = getDefaults;

    function setDefaults(config) {
      extendsObject(defaults, config);
    }

    function getDefaults() {
      return defaults;
    }
  }

  http.factory('ggHttp', ggHttpFactory);
  ggHttpFactory.$inject = ['$http', '$q', 'ggHttpConfig'];

  function ggHttpFactory($http, $q, ggHttpConfig) {
    var resolveAllMethods = /(@get|@Get|@GET|@post|@Post|@POST|@put|@Put|@PUT|@delete|@Delete|@DELETE)/;

    var myInterface = resolveAll;

    return myInterface;

    function resolveAll(baseUrl, funcs, obj) {
      baseUrl = baseUrl || '';
      var api = isObject(obj) ? obj : {};

      if (funcs) {
        if (isObject(funcs)) {
          if (isArray(funcs)) {
            funcs.forEach(resolveFunction);
          } else {
            Object.keys(funcs).map(function (funcName) {
                if (isArray(funcs[funcName])) {
                  funcs[funcName][0] = funcName + funcs[funcName][0];
                  return funcs[funcName];
                } else {
                  return funcName + funcs[funcName];
                }
              })
              .forEach(resolveFunction);
          }
        }
        return api;
      } else {
        throw Error('No methods were found to create');
      }

      function resolveFunction(func) {
        if (isString(func)) {
          var aux = resolveFunctionString(func);
          var funcName = aux[0];
          var funcMethod = aux[1];
          var funcUrl = aux[2];
          resolveFunctionToApi(api, baseUrl, funcName, funcMethod, funcUrl);
        } else if (isObject(func)) {
          if (isArray(func)) {
            if (isString(func[0])) {
              var aux = resolveFunctionString(func[0]);
              var funcName = aux[0];
              var funcMethod = aux[1];
              var funcUrl = aux[2];
              resolveFunctionToApi(api, baseUrl, funcName, funcMethod, funcUrl, func[1]);
            } else {
              throw Error('No string method was found');
            }
          } else {
            Object.keys(func).forEach(function (item) {
              api[item] = func[item];
            });
          }
        } else if (isFunction(func)) {
          api[func.name] = func;
        }
      }

      function resolveFunctionString(func) {
        return func.replace('=', '').split(resolveAllMethods);
      }

      function resolveFunctionToApi(api, baseUrl, funcName, funcMethod, funcUrl, config) {
        api[funcName] = function () {
          return resolve(baseUrl, funcMethod, funcUrl, arguments, (isObject(config) ? config : {}));
        };
      }
    }


    function resolve(baseUrl, method, url, args, defaultConfig) {
      baseUrl += baseUrl.charAt(baseUrl.length - 1) != '/' ? url.length > 0 ? url.charAt(0) != '/' ? '/' : '' : '' : '';
      method = method.indexOf('@') > -1 ? method.toUpperCase().substring(1, method.length) : method.toUpperCase();
      var config = extendsObject({}, ggHttpConfig.getDefaults());
      config.method = method;
      config.url = baseUrl + url;
      extendsConfig(defaultConfig)
      if (url.indexOf(':') > -1) {
        var parameters = {};
        var paramReg = /(:[A-z]+)/g;
        var params = [];
        var param;
        do {
          param = paramReg.exec(url);
          if (param) {
            params.push(param[0]);
          }
        } while (param);

        for (param in params) {
          parameters[params[param].replace(/:/, '')] = params[param];
        }

        if (!isUndefined(args[0])) {
          for (param in parameters) {
            if (!isUndefined(args[0][param])) {
              url = url.replace(parameters[param], args[0][param]);
            } else {
              throw Error('Url parameter \'' + parameters[param] + '\' wasn\'t found');
            }
          }
        } else {
          throw Error('No url parameter was passed as parameter');
        }

        if (!isUndefined(args[1])) {
          if (isEquals(method, 'GET')) {
            config.params = args[1];
            if (!isUndefined(args[2])) {
              extendsConfig(args[2]);
            }
          } else {
            config.data = args[1];
            if (!isUndefined(args[2])) {
              config.params = args[2];
            }
            if (!isUndefined(args[3])) {
              extendsConfig(args[3]);
            }
          }
        }
      } else {
        if (!isUndefined(args[0])) {
          if (isEquals(method, 'GET')) {
            config.params = args[0];
            if (!isUndefined(args[1])) {
              extendsConfig(args[1]);
            }
          } else {
            config.data = args[0];
            if (!isUndefined(args[1])) {
              config.params = args[1];
            }
            if (!isUndefined(args[2])) {
              extendsConfig(args[2]);
            }
          }
        }
      }

      config.url = baseUrl + url;
      var request = null
      if (isUndefined(config.timeout) || isEquals(config.cancelable, true)) {
        var cancelRequest = $q.defer();
        config.timeout = cancelRequest.promise;
        request = $http(config);
        request.cancel = function () {
          cancelRequest.resolve();
        }
      } else {
        request = $http(config);
      }
      return request;

      function extendsConfig(obj) {
        if (!isUndefined(obj) && isObject(obj)) {
          extendsObject(config, obj);
        } else {
          throw Error('The configuration parameter must be an object');
        }
      }
    }
  }

})();
function isEquals(val1, val2) {
  return val1 === val2;
}

function isArray(val) {
  return val instanceof Array;
}

function isUndefined(val) {
  return isEquals(val, undefined);
}

function isDefined(val) {
  return !isUndefined(val);
}

function isString(val) {
  return isEquals(typeof val, 'string');
}

function isObject(val) {
  return isEquals(typeof val, 'object');
}

function isFunction(val) {
  return isEquals(typeof val, 'function');
}

function extendsObject(dst, src) {
  if (!isObject(dst) || !isObject(src)) {
    throw Error('extendsObject only accepts Objects');
  }
  Object.keys(src).forEach(function (item) {
    dst[item] = src[item];
  });
  return dst;
}