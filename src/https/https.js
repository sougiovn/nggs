(function() {
    'use strict';

    var https = angular.module('fm.https', []);

    https.factory('fmHttpsFactory', fmHttpsFactory);
    fmHttpsFactory.$inject = ['$http'];
    function fmHttpsFactory($http) {
        var resolveAllMethods = /(@get|@Get|@GET|@post|@Post|@POST|@put|@Put|@PUT|@delete|@Delete|@DELETE)/;
        var resolveHttpsMethods = /(GET|POST|PUT|DELETE)/;

        var factory = {
            resolve: resolveAll,
            resolveHttps: resolveHttps
        };

        return factory;

        function resolveAll(host, funcs, obj) {
            var api = typeof obj === 'object' ? obj : {};

            funcs.forEach(function(func) {
                if(typeof func === 'string') {
                    func = func.replace('=', '').split(resolveAllMethods);
                    var funcName = func[0];
                    var funcMethod = func[1];
                    var funcUrl = func[2];
                    api[funcName] = function() {
                        return resolve(host, funcMethod, funcUrl, arguments);
                    };
                } else if(typeof func === 'object') {
                    angular.forEach(func, function(item, key) {
                        api[key] = item;
                    });
                } else if(typeof func === 'function') {
                    api[func.name] = func;
                }
            });

            return api;
        }

        function resolveHttps(method, url) {
            if(method !== undefined && url !== undefined) {
                if(resolveHttpsMethods.test(method.toUpperCase())) {
                    var args = [];
                    for(var i = 2; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    var protocol = '';
                    if(url.indexOf('://') > -1) {
                        if(url.indexOf('localhost') > -1) {
                            protocol = url.substring(0, url.indexOf('localhost') + 9);
                            var aux = url.substring(protocol.length, url.length);
                            protocol += aux.substring(0, aux.indexOf('/')+1);
                        } else {
                            protocol = url.substring(0, url.indexOf('://') + 3);
                        }
                        url = url.substring(protocol.length, url.length);
                    }
                    resolve(protocol, method, url, args);
                } else {
                    console.error('Invalid method');
                }
            } else {
                console.error('You must at least pass the method and url as parameter');
            }
        }

        function resolve(hostP, metodo, urle, args) {
            var method = metodo.indexOf('@') > -1 ? metodo.toUpperCase().substring(1, metodo.length) : metodo.toUpperCase();
            var url = urle;
            var host = hostP;
            host += host.charAt(host.length-1) != '/' ? url.length > 0 ? url.charAt(0) != '/' ? '/' : '' : '' : '';
            var params = undefined;
            var hasParams = false;
            var config = {
            	method: method,
            	url: host + url
            };
            if(url.indexOf(':') > -1) {
            	hasParams = true;
            	var paramReg = /(:[A-z]+)/g;
            	var prms = [];
            	var p;
            	do {
            		p = paramReg.exec(url);
            		if(p) {
            			prms.push(p[0]);
            		}
            	} while(p);
            	params = {};
            	for(p in prms) {
            		params[prms[p].replace(/:/, '')] = prms[p];
            	}
            }
            if(hasParams) {
            	for(p in params) {
            		url = url.replace(params[p], args[0][p]);
            	}
            	if(args[1] !== undefined) {
            		if(method == 'GET') {
            			url += queryParam(args[1]);
            		} else {
            			config.data = args[1];
            			if(args[2] !== undefined) {
            				url += queryParam(args[2]);
            			}
            		}
            	}
            } else {
            	if(args[0] !== undefined) {
            		if(method == 'GET') {
            			url += queryParam(args[0]);
            		} else {
            			config.data = args[0];
            			if(args[1] !== undefined) {
            				url += queryParam(args[1]);
            			}
            		}
            	}
            }
            config.url = host + url;
            return $http(config);
            function queryParam(args) {
            	var prefix = '?';
            	var query = args;
            	var queryParams = '';
            	for(var p in query) {
            		queryParams += prefix + p + '='+ query[p];
            		prefix = '&';
            	}
            	return queryParams;
            }
        }
    }
})();
