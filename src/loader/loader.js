(function() {
    'use strict';

    var loader = angular.module('fm.loader', []);

    loader.provider('fmLoaderConfig', fmLoaderConfig);
    function fmLoaderConfig() {
        var provider = this;
        var ativado = false;
        var queryParam = 'fmloader';

        provider.$get = function() {
            return provider;
        };
        provider.isAtivado = isAtivado;
        provider.setAtivacao = setAtivacao;
        provider.getQueryParamAtivacao = getQueryParamAtivacao;

        function isAtivado() {
            return isAtivado;
        }
        function setAtivacao(queryP) {
            ativado = true;
            queryParam = queryP || queryParam;
        }
        function getQueryParamAtivacao() {
            return queryParam;
        }
    }

    loader.factory('fmLoaderInterceptor', fmLoaderInterceptor);
    fmLoaderInterceptor.$inject = ['$q', '$rootScope', 'fmLoaderConfig'];
    function fmLoaderInterceptor($q, $rootScope, fmLoaderConfig) {
        var isAtivado = fmLoaderConfig.isAtivado();
        var queryParamAtivacao = fmLoaderConfig.getQueryParamAtivacao() + '=true';
        var numLoadings = 0;

        var factory = {
            request: request,
            response: response,
            responseError: responseError
        };

        return factory;

        function request(config) {
            if(isAtivado) {
                var urlQuery = config.url.substring(config.url.indexOf('?'), config.url.length);
                if(urlQuery.indexOf(queryParamAtivacao) > -1) {
                    return show(config);
                }
            } else {
                return show(config);
            }
            return config || $q.when(config);
        }
        function response(response) {
            if(isAtivado) {
                var urlQuery = response.config.url.substring(response.config.url.indexOf('?'), response.config.url.length);
                if(urlQuery.indexOf(queryParamAtivacao) > -1) {
                    return hide(response);
                }
            } else {
                return hide(response);
            }
            return response || $q.when(response);
        }
        function responseError(response) {
            if(isAtivado) {
                var urlQuery = response.config.url.substring(response.config.url.indexOf('?'), response.config.url.length);
                if(urlQuery.indexOf(queryParamAtivacao) > -1) {
                    return hideErr(response);
                }
            } else {
                return hideErr(response);
            }
            return $q.reject(response);
        }

        function show(config) {
            numLoadings++;
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config);
        }
        function hide(response) {
            if ((--numLoadings) === 0) {
                $rootScope.$broadcast("loader_hide");
            }
            return response || $q.when(response);
        }
        function hideErr(response) {
            if ((--numLoadings) === 0) {
                $rootScope.$broadcast("loader_hide");
            }
            return $q.reject(response);
        }
    }

    loader.directive('fmLoader', fmLoader);
    function fmLoader() {
        var directive = {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).hide();
                scope.$on('loader_show', function (args) {
                    return $(element).show();
                });
                scope.$on('loader_hide', function (args) {
                    return $(element).hide();
                });
            }
        };
        return directive;
    }
})();
