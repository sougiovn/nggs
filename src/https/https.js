(function () {
  'use strict';

  var https = angular.module('nggs.https', []);

  https.factory('nggsHttpsFactory', nggsHttpsFactory);
  nggsHttpsFactory.$inject = ['$http'];

  function nggsHttpsFactory($http) {
    var resolveAllMethods = /(@get|@Get|@GET|@post|@Post|@POST|@put|@Put|@PUT|@delete|@Delete|@DELETE)/;
    var resolveHttpsMethods = /(GET|POST|PUT|DELETE)/;

    var factory = {
      resolve: resolveAll,
      resolveHttps: resolveHttps
    };

    return factory;

    function resolveAll(host, funcs, obj) {
      var api = isObject(obj) ? obj : {};

      funcs.forEach(function (func) {
        if (isString(func)) {
          func = func.replace('=', '').split(resolveAllMethods);
          var funcName = func[0];
          var funcMethod = func[1];
          var funcUrl = func[2];
          api[funcName] = function () {
            return resolve(host, funcMethod, funcUrl, arguments);
          };
        } else if (isObject(func)) {
          if (func instanceof Array) {

          } else {
            Object.keys(func).forEach(function (item) {
              api[item] = func[item];
            });
          }
        } else if (isFunction(func)) {
          api[func.name] = func;
        }
      });

      return api;
    }

    function resolveHttps(method, url) {
      if (!isUndefined(method) && !isUndefined(url)) {
        if (resolveHttpsMethods.test(method.toUpperCase())) {
          var args = [];
          for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          var protocol = '';
          if (url.indexOf('://') > -1) {
            if (url.indexOf('localhost') > -1) {
              protocol = url.substring(0, url.indexOf('localhost') + 9);
              var aux = url.substring(protocol.length, url.length);
              protocol += aux.substring(0, aux.indexOf('/') + 1);
            } else {
              protocol = url.substring(0, url.indexOf('://') + 3);
            }
            url = url.substring(protocol.length, url.length);
          }
          return resolve(protocol, method, url, args);
        } else {
          throw Error('Invalid method');
        }
      } else {
        throw Error('You must at least pass the method and url as parameter');
      }
    }

    function resolve(host, method, url, args) {
      host += host.charAt(host.length - 1) != '/' ? url.length > 0 ? url.charAt(0) != '/' ? '/' : '' : '' : '';
      method = method.indexOf('@') > -1 ? method.toUpperCase().substring(1, method.length) : method.toUpperCase();
      var config = {
        method: method,
        url: host + url
      };
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
            config.params = args[1]
            if(!isUndefined(args[2])) {
              extendsConfig(args[2])
            }
          } else {
            config.data = args[1];
            if (!isUndefined(args[2])) {
              config.params  = args[2]
            }
            if(!isUndefined(args[3])) {
              extendsConfig(args[3])
            }
          }
        }
      } else {
        if (!isUndefined(args[0])) {
          if (isEquals(method, 'GET')) {
            config.params = args[0]
            if(!isUndefined(args[1])) {
              extendsConfig(args[1])
            }
          } else {
            config.data = args[0];
            if (!isUndefined(args[1])) {
              config.params = args[1]
            }
            if(!isUndefined(args[2])) {
              extendsConfig(args[2])
            }
          }
        }
      }

      config.url = host + url;
      return $http(config);

      function extendsConfig(obj) {
        if (!isUndefined(obj) && isObject(obj)) {
          Object.keys(obj).forEach(function(item) {
            config[item] = obj[item]
          });
        } else {
          throw Error('The configuration parameter must be an object')
        }
      }
    }
  }

  function isEquals(val1, val2) {
    return val1 === val2
  }
  function isUndefined(val) {
    return isEquals(val, undefined)
  }
  function isString(val) {
    return isEquals(typeof val, 'string')
  }
  function isObject(val) {
    return isEquals(typeof val, 'object')
  }
  function isFunction(val) {
    return isEquals(typeof val, 'function')
  }
})();