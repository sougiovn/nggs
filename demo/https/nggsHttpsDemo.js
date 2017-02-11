define([
    'angular',
    'nggs.https'
    ],
    function() {
        'use strict';

        var nggsHttpsDemo = angular.module('nggsHttpsDemo', ['nggs.https']);

        nggsHttpsDemo.config(nggsHttpsDemoConfig);
        nggsHttpsDemoConfig.$inject = ['$locationProvider'];
        function nggsHttpsDemoConfig($locationProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }

        nggsHttpsDemo.factory('nggsHttpsDemoFactory', nggsHttpsDemoFactory);
        nggsHttpsDemoFactory.$inject = ['nggsHttpsFactory'];
        function nggsHttpsDemoFactory(nggsHttpsFactory) {
            var baseUrl = 'http://localhost:8000/api';
            var urls = [
                'get@get=/test',
                'post@post=/test/:cod'
            ];

            var factory = nggsHttpsFactory.resolve(baseUrl, urls);

            return factory;
        }

        nggsHttpsDemo.controller('nggsHttpsDemoController', nggsHttpsDemoController);
        nggsHttpsDemoController.$inject = ['nggsHttpsDemoFactory', 'nggsHttpsFactory', '$anchorScroll'];
        function nggsHttpsDemoController(nggsHttpsDemoFactory, nggsHttpsFactory, $anchorScroll) {
            var vm = this;

            $anchorScroll();

            nggsHttpsDemoFactory.get({ pagina: 1, tamanho: 10 });
            nggsHttpsDemoFactory.post({cod: 1}, { data: 'pacote' }, { query: 'lalala' });
            nggsHttpsFactory.resolveHttps('get', 'api/test', { pagina: 1 });
            nggsHttpsFactory.resolveHttps('post', 'api/test/:pagina', { pagina: 1 }, {tamanho: 10});
        }
    }
);
