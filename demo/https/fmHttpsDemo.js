define([
    'angular',
    'fm.https'
    ],
    function() {
        'use strict';

        var fmHttpsDemo = angular.module('fmHttpsDemo', ['fm.https']);

        fmHttpsDemo.config(fmHttpsDemoConfig);
        fmHttpsDemoConfig.$inject = ['$locationProvider'];
        function fmHttpsDemoConfig($locationProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }

        fmHttpsDemo.factory('fmHttpsDemoFactory', fmHttpsDemoFactory);
        fmHttpsDemoFactory.$inject = ['fmHttpsFactory'];
        function fmHttpsDemoFactory(fmHttpsFactory) {
            var baseUrl = 'http://localhost:8000/api';
            var urls = [
                'get@get=/test',
                'post@post=/test/:cod'
            ];

            var factory = fmHttpsFactory.resolve(baseUrl, urls);

            return factory;
        }

        fmHttpsDemo.controller('fmHttpsDemoController', fmHttpsDemoController);
        fmHttpsDemoController.$inject = ['fmHttpsDemoFactory', 'fmHttpsFactory', '$anchorScroll'];
        function fmHttpsDemoController(fmHttpsDemoFactory, fmHttpsFactory, $anchorScroll) {
            var vm = this;

            $anchorScroll();

            fmHttpsDemoFactory.get({ pagina: 1, tamanho: 10 });
            fmHttpsDemoFactory.post({cod: 1}, { data: 'pacote' }, { query: 'lalala' });
            fmHttpsFactory.resolveHttps('get', 'api/test', { pagina: 1 });
            fmHttpsFactory.resolveHttps('post', 'api/test/:pagina', { pagina: 1 }, {tamanho: 10});
        }
    }
);
