define([
    'angular',
    'fm.loader',
    'fm.https'
    ],
    function() {
        'use strict';

        var fmLoaderDemo = angular.module('fmLoaderDemo', ['fm.loader', 'fm.https']);

        fmLoaderDemo.config(fmLoaderDemoConfig);
        fmLoaderDemoConfig.$inject = ['$httpProvider', 'fmLoaderConfigProvider'];
        function fmLoaderDemoConfig($httpProvider, fmLoaderConfigProvider) {
            $httpProvider.interceptors.push('fmLoaderInterceptor');

            fmLoaderConfigProvider.setCustomActivation();
        }

        fmLoaderDemo.controller('fmLoaderDemoController', fmLoaderDemoController);
        fmLoaderDemoController.$inject = ['fmLoaderFactory', 'fmHttpsFactory'];
        function fmLoaderDemoController(fmLoaderFactory, fmHttpsFactory) {
            var vm = this;

            fmHttpsFactory.resolveHttps('get', 'https://httpbin.org/get?fmloader=check&lala=2')
                .then(function(response) {
                    console.log(response);
                });
        }
    }
);
