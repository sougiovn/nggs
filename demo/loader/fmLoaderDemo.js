define([
    'angular',
    'fm.loader',
    'fm.https'
    ],
    function() {
        'use strict';

        var fmLoaderDemo = angular.module('fmLoaderDemo', ['fm.loader', 'fm.https']);

        fmLoaderDemo.config(fmLoaderDemoConfig);
        fmLoaderDemoConfig.$inject = ['$httpProvider', 'fmLoaderConfigProvider', '$locationProvider'];
        function fmLoaderDemoConfig($httpProvider, fmLoaderConfigProvider, $locationProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: false });

            $httpProvider.interceptors.push('fmLoaderInterceptor');

            fmLoaderConfigProvider.setCustomActivation();
        }

        fmLoaderDemo.controller('fmLoaderDemoController', fmLoaderDemoController);
        fmLoaderDemoController.$inject = [
            'fmLoaderFactory', 'fmHttpsFactory', '$anchorScroll',
            '$rootScope', '$timeout'
        ];
        function fmLoaderDemoController(
            fmLoaderFactory, fmHttpsFactory, $anchorScroll,
            $rootScope, $timeout
        ) {
            var vm = this;

            vm.http = http;
            vm.manualShow = manualShow;
            vm.manualHide = manualHide;

            $anchorScroll();

            function http(loader) {
                fmHttpsFactory.resolveHttps('get', 'https://httpbin.org/get', { fmloader: loader })
                    .then(function(response) { console.log(response); })
                    .catch(function(error) { console.error(error); });
            }
            function manualShow(loader) {
                fmLoaderFactory.show(loader);
                if(loader == 'fullLoading') {
                    $timeout(function() {
                        fmLoaderFactory.hide(loader)
                    }, 1000);
                }
            }
            function manualHide(loader) {
                fmLoaderFactory.hide(loader);
            }
        }
    }
);
