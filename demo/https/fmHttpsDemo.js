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
                test,
                function lala() {
                    console.log('aiiaia');
                },{
                    lol: 'lol'
                }
            ];

            var factory = fmHttpsFactory.resolve(baseUrl, urls);

            return factory;

            function test() {
                console.log('lalala test');
            }
        }

        fmHttpsDemo.controller('fmHttpsDemoController', fmHttpsDemoController);
        fmHttpsDemoController.$inject = ['fmHttpsDemoFactory', 'fmHttpsFactory'];
        function fmHttpsDemoController(fmHttpsDemoFactory, fmHttpsFactory) {
            var vm = this;

            fmHttpsDemoFactory.test();
            fmHttpsDemoFactory.lala();
            fmHttpsDemoFactory.get({ pagina: 1, tamanho: 10 });
            fmHttpsFactory.resolveHttps('get', 'http://localhost:8000/api/test', { pagina: 1 });
            fmHttpsFactory.resolveHttps('post', 'http://localhost:8000/api/test', { pagina: 1 }, {tamanho: 10});
        }
    }
);
