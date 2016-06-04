(function() {
    'use strict';

    var fmLoader = angular.module('fm.loader', []);

    fmLoader.provider('fmLoaderConfig', fmLoaderConfig);
    function fmLoaderConfig() {
        var provider = this;
        var active = false;
        var queryParam = 'fmloader';

        provider.$get = function() {
            return provider;
        };
        provider.isActive = isActive;
        provider.setCustomActivation = setCustomActivation;
        provider.getQueryParamActivation = getQueryParamActivation;

        function isActive() {
            return active;
        }
        function setCustomActivation(queryP) {
            active = true;
            queryParam = queryP || queryParam;
        }
        function getQueryParamActivation() {
            return queryParam;
        }
    }

    fmLoader.factory('fmLoaderFactory', fmLoaderFactory);
    fmLoaderFactory.$inject = ['$rootScope'];
    function fmLoaderFactory($rootScope) {
        var factory = {
            show: show,
            hide: hide
        };

        return factory;

        function show(id) {
            id = typeof id !== undefined ? '_'+id : '';
            $rootScope.$broadcast('loader_show'+id);
        }
        function hide(id) {
            id = typeof id !== undefined ? '_'+id : '';
            $rootScope.$broadcast('loader_hide'+id);
        }
    }

    fmLoader.factory('fmLoaderInterceptor', fmLoaderInterceptor);
    fmLoaderInterceptor.$inject = ['$q', '$rootScope', 'fmLoaderConfig'];
    function fmLoaderInterceptor($q, $rootScope, fmLoaderConfig) {
        var isActive = fmLoaderConfig.isActive();
        var queryParamAtivacao = fmLoaderConfig.getQueryParamActivation() + '=';
        var numLoadings = 0;

        var factory = {
            request: request,
            response: response,
            responseError: responseError
        };

        return factory;

        function request(config) {
            if(isActive) {
                var urlQuery = config.url.substring(config.url.indexOf('?'), config.url.length);
                if(urlQuery.indexOf(queryParamAtivacao) > -1) {
                    return show(config, resolveId(urlQuery));
                }
            } else {
                return show(config);
            }
            return config || $q.when(config);
        }
        function response(response) {
            if(isActive) {
                var urlQuery = response.config.url.substring(response.config.url.indexOf('?'), response.config.url.length);
                if(urlQuery.indexOf(queryParamAtivacao) > -1) {
                    return hide(response, resolveId(urlQuery));
                }
            } else {
                return hide(response);
            }
            return response || $q.when(response);
        }
        function responseError(response) {
            if(isActive) {
                var urlQuery = response.config.url.substring(response.config.url.indexOf('?'), response.config.url.length);
                if(urlQuery.indexOf(queryParamAtivacao) > -1) {
                    return hideErr(response, resolveId(urlQuery));
                }
            } else {
                return hideErr(response);
            }
            return $q.reject(response);
        }

        function resolveId(urlQuery) {
            var id = urlQuery.substring(urlQuery.indexOf(queryParamAtivacao)+queryParamAtivacao.length, urlQuery.length);
            if(id.indexOf('&') > -1) {
                id = id.substring(0, id.indexOf('&'));
            }
            if(id === 'true') {
                id = '';
            } else {
                id = '_'+id;
            }
            return id;
        }
        function show(config, id) {
            id = id || '';
            numLoadings++;
            $rootScope.$broadcast('loader_show'+id);
            return config || $q.when(config);
        }
        function hide(response, id) {
            id = id || '';
            if ((--numLoadings) === 0) {
                $rootScope.$broadcast('loader_hide'+id);
            }
            return response || $q.when(response);
        }
        function hideErr(response, id) {
            id = id || '';
            if ((--numLoadings) === 0) {
                $rootScope.$broadcast('loader_hide'+id);
            }
            return $q.reject(response);
        }
    }

    fmLoader.directive('fmLoader', fmLoaderDirective);
    function fmLoaderDirective() {
        var directive = {
            restrict: 'A',
            scope: {
                fmLoader: '@'
            },
            link: function(scope, element, attrs) {
                var id = scope.fmLoader;
                id = id.length > 0 ? '_'+id : '';
                $(element).hide();
                scope.$on('loader_show'+id, function (args) {
                    return $(element).show();
                });
                scope.$on('loader_hide'+id, function (args) {
                    return $(element).hide();
                });
            }
        };
        return directive;
    }
})();
