define([
    'angular',
    'nggs.loader',
    'nggs.http'
  ],
  function () {
    'use strict';

    var nggsLoaderDemo = angular.module('nggsLoaderDemo', ['nggs.loader', 'nggs.http']);

    nggsLoaderDemo.config(nggsLoaderDemoConfig);
    nggsLoaderDemoConfig.$inject = ['$httpProvider', 'ggLoaderConfigProvider', '$locationProvider'];

    function nggsLoaderDemoConfig($httpProvider, ggLoaderConfigProvider, $locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $httpProvider.interceptors.push('ggLoaderInterceptor');

      ggLoaderConfigProvider.setCustomActivation();
    }

    nggsLoaderDemo.controller('nggsLoaderDemoController', nggsLoaderDemoController);
    nggsLoaderDemoController.$inject = ['ggLoader', 'ggHttp', '$anchorScroll', '$rootScope', '$timeout'];

    function nggsLoaderDemoController(ggLoader, ggHttp, $anchorScroll, $rootScope, $timeout) {
      $anchorScroll();

      var self = this;

      var api = ggHttp('https://httpbin.org/get', ['get@get'])
      self.http = http;
      self.manualShow = manualShow;
      self.manualHide = manualHide;

      function http(loader) {
        api.get({
            ggloader: loader
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });
      }

      function manualShow(loader) {
        ggLoader.show(loader);
        if (loader == 'fullLoading') {
          $timeout(function () {
            ggLoader.hide(loader)
          }, 1000);
        }
      }

      function manualHide(loader) {
        ggLoader.hide(loader);
      }
    }
  }
);