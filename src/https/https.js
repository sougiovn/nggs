(function() {
    'use strict';

    var https = angular.module('fm.https', []);

    https.factory('fmHttpsGen', fmHttpsGen);
    fmHttpsGen.$inject = ['$http'];
    function fmHttpsGen($http) {
        var factory = {
                generate: generate
        };

        return factory;

        function generate(host, funcs, obj) {
            var api = angular.isObject(obj) ? obj : {};

            for(var i in funcs) {
                var resolve = new Function("hostP", "metodo", "urle", "$http",
                "return function() {"+
                "	var method = metodo.toUpperCase().substring(1, metodo.length);"+
                "	var url = urle;"+
                "	var host = hostP;"+
                "	host += url.length > 0 ? url.charAt(0) != '/' ? '/' : '' : '';"+
                "	var params = undefined;"+
                "	var hasParams = false;"+
                "	var config = { "+
                "		method: method,"+
                "		url: host + url "+
                "	}; "+
                "	if(url.indexOf(':') > -1) {"+
                "		hasParams = true;"+
                "		var paramReg = /(:[A-z]+)/g;"+
                "		var prms = [];"+
                "		var p;"+
                "		do {"+
                "			p = paramReg.exec(url);"+
                "			if(p) {"+
                "				prms.push(p[0]);"+
                "			}"+
                "		} while(p);"+
                "		params = {};"+
                "		for(p in prms) {"+
                "			params[prms[p].replace(/:/, '')] = prms[p];"+
                "		}"+
                "	}"+
                "	if(hasParams) {"+
                "		for(p in params) {"+
                "			url = url.replace(params[p], arguments[0][p]);"+
                "		}"+
                "		if(arguments[1] != undefined) {"+
                "			if(method == 'GET') {"+
                "				url += queryParam(arguments[1]);"+
                "			} else {"+
                "				config.data = arguments[1];"+
                "				if(arguments[2] != undefined) {"+
                "					url += queryParam(arguments[2])"+
                "				}"+
                "			}"+
                "		}"+
                "	} else {"+
                "		if(arguments[0] != undefined) {"+
                "			if(method == 'GET') {"+
                "				url += queryParam(arguments[0]);"+
                "			} else {"+
                "				config.data = arguments[0];"+
                "				if(arguments[1] != undefined) {"+
                "					url += queryParam(arguments[1])"+
                "				}"+
                "			}"+
                "		}"+
                "	}"+
                "	config.url = host + url;"+
                "	return $http(config);"+
                "	function queryParam(args) {"+
                "		var prefix = '?';"+
                "		var query = args;"+
                "		var queryParams = '';"+
                "		for(var p in query) {"+
                "			queryParams += prefix + p + '='+ query[p];"+
                "			prefix = '&';"+
                "		}"+
                "		return queryParams;"+
                "	}"+
                "}");

                var methods = /(@get|@Get|@GET|@post|@Post|@POST|@put|@Put|@PUT|@delete|@Delete|@DELETE)/;
                if(angular.isString(funcs[i])) {
                    funcs[i] = funcs[i].replace('=', '').split(methods);
                    api[funcs[i][0]] = resolve(host, funcs[i][1], funcs[i][2], $http);
                } else {
                    angular.forEach(funcs[i], function(item, key) {
                        api[key] = item;
                    });
                }
            }

            return api;
        }
    }
})();
