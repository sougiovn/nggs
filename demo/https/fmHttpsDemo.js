define([
    'angular',
    'fm.https'
    ],
    function() {
        'use strict';

        var fmHttpsDemo = angular.module('fmHttpsDemo', ['fm.https']);

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
        fmHttpsDemoController.$inject = ['fmHttpsDemoFactory', 'fmHttpsFactory'];
        function fmHttpsDemoController(fmHttpsDemoFactory, fmHttpsFactory) {
            var vm = this;

            fmHttpsDemoFactory.get({ pagina: 1, tamanho: 10 });
            fmHttpsDemoFactory.post({cod: 1}, { data: 'pacote' }, { query: 'lalala' });
            fmHttpsFactory.resolveHttps('get', 'api/test', { pagina: 1 });
            fmHttpsFactory.resolveHttps('post', 'api/test/:pagina', { pagina: 1 }, {tamanho: 10});
            fmHttpsDemoFactory.get({ pagina: 1, tamanho: 10 });
            fmHttpsDemoFactory.post({cod: 1}, { data: 'pacote' }, { query: 'lalala' });
        }
    }
);
