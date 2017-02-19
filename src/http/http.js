(function () {
  'use strict';

  var https = angular.module('nggs.http', []);

  https.factory('ggHttp', ggHttp);
  ggHttp.$inject = ['$http'];

  function ggHttp($http) {
    var resolveAllMethods = /(@get|@Get|@GET|@post|@Post|@POST|@put|@Put|@PUT|@delete|@Delete|@DELETE|@head|@Head|@HEAD|@connect|@Connect|@CONNECT|@options|@Options|@OPTIONS|@trace|@Trace|@TRACE|@patch|@Patch|@PATCH)/;

    var myInterface = resolveAll;

    return myInterface;

    /*
    ['getUser@get=/:id']
    [['getUser@get=/:id', {params: {teste:'lala'}}]]
    {getUser:'get=/:id'}
    */

    function resolveAll(host, funcs, obj) {
      host = host || '';
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
        console.log(func)
        if (isString(func)) {
          var aux = resolveFunctionString(func);
          var funcName = aux[0];
          var funcMethod = aux[1];
          var funcUrl = aux[2];
          resolveFunctionToApi(api, host, funcName, funcMethod, funcUrl);
        } else if (isObject(func)) {
          if (isArray(func)) {
            if (isString(func[0])) {
              var aux = resolveFunctionString(func[0]);
              var funcName = aux[0];
              var funcMethod = aux[1];
              var funcUrl = aux[2];
              resolveFunctionToApi(api, host, funcName, funcMethod, funcUrl, func[1]);
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

      function resolveFunctionToApi(api, host, funcName, funcMethod, funcUrl, config) {
        api[funcName] = function () {
          return resolve(host, funcMethod, funcUrl, arguments, (isObject(config) ? config : {}));
        };
      }
    }


    function resolve(host, method, url, args, defaultConfig) {
      host += host.charAt(host.length - 1) != '/' ? url.length > 0 ? url.charAt(0) != '/' ? '/' : '' : '' : '';
      method = method.indexOf('@') > -1 ? method.toUpperCase().substring(1, method.length) : method.toUpperCase();
      var config = {
        method: method,
        url: host + url
      };
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

      config.url = host + url;
      return $http(config);

      function extendsConfig(obj) {
        if (!isUndefined(obj) && isObject(obj)) {
          Object.keys(obj).forEach(function (item) {
            config[item] = obj[item];
          });
        } else {
          throw Error('The configuration parameter must be an object');
        }
      }
    }
  }

  function isEquals(val1, val2) {
    return val1 === val2;
  }

  function isArray(val) {
    return val instanceof Array;
  }

  function isUndefined(val) {
    return isEquals(val, undefined);
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
})();