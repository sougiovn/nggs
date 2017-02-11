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
      var api = typeof obj === 'object' ? obj : {};

      funcs.forEach(function (func) {
        if (typeof func === 'string') {
          func = func.replace('=', '').split(resolveAllMethods);
          var funcName = func[0];
          var funcMethod = func[1];
          var funcUrl = func[2];
          api[funcName] = function () {
            return resolve(host, funcMethod, funcUrl, arguments);
          };
        } else if (typeof func === 'object') {
          if (func instanceof Array) {

          } else {
            Object.keys(func).forEach(function (item) {
              api[item] = func[item];
            });
          }
        } else if (typeof func === 'function') {
          api[func.name] = func;
        }
      });

      return api;
    }

    function resolveHttps(method, url) {
      if (method !== 'undefined' && url !== 'undefined') {
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

        if (args[0] !== 'undefined') {
          for (param in parameters) {
            if (args[0][param] !== 'undefined') {
              url = url.replace(parameters[param], args[0][param]);
            } else {
              throw Error('Url parameter \'' + parameters[param] + '\' wasn\'t found');
            }
          }
        } else {
          throw Error('No url parameter was passed as parameter');
        }

        if (args[1] !== 'undefined') {
          if (method == 'GET') {
            config.params  = args[1]
            // url += queryParams(args[1]);
          } else {
            config.data = args[1];
            if (args[2] !== 'undefined') {
              config.params  = args[2]
              // url += queryParams(args[2]);
            }
          }
        }
      } else {
        if (args[0] !== 'undefined') {
          if (method == 'GET') {
            config.params  = args[0]
            // url += queryParams(args[0]);
          } else {
            config.data = args[0];
            if (args[1] !== 'undefined') {
              config.params  = args[1]
              // url += queryParams(args[1]);
            }
          }
        }
      }

      config.url = host + url;

      return $http(config);

      function queryParams(args) {
        var prefix = '?';
        var query = args;
        var queryParams = '';
        for (var param in query) {
          queryParams += prefix + param + '=' + query[param];
          prefix = '&';
        }
        return queryParams;
      }
    }
  }
})();