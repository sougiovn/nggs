define([
    'angular',
    'angular-translate',
    'angular-translate-loader-static-files',
    'nggs.loader',
    'nggs.http'
  ],
  function () {
    'use strict';

    var nggsLoaderDemo = angular.module('nggsLoaderDemo', ['nggs.loader', 'nggs.http', 'pascalprecht.translate']);

    nggsLoaderDemo.config(nggsLoaderDemoConfig);
    nggsLoaderDemoConfig.$inject = ['$httpProvider', 'ggLoaderConfigProvider', '$locationProvider', '$translateProvider'];

    function nggsLoaderDemoConfig($httpProvider, ggLoaderConfigProvider, $locationProvider, $translateProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $httpProvider.interceptors.unshift('ggLoaderInterceptor');

      $translateProvider.useStaticFilesLoader({
        prefix: '../../assets/i18n/',
        suffix: ['.json?bc=',Date.now()].join('')
      });
      var preferredLanguage = 'en'
      if (Storage) {
        var aux = localStorage.getItem('nggsLanguage');
        if (aux) {
          preferredLanguage = aux;
        }
      }
      $translateProvider.preferredLanguage(preferredLanguage);
    }

    nggsLoaderDemo.controller('nggsLoaderDemoController', nggsLoaderDemoController);
    nggsLoaderDemoController.$inject = ['ggLoader', 'ggHttp', '$anchorScroll', '$rootScope', '$timeout', '$translate'];

    function nggsLoaderDemoController(ggLoader, ggHttp, $anchorScroll, $rootScope, $timeout, $translate) {
      $anchorScroll();

      var self = this;

      self.currentLanguage = $translate.preferredLanguage();

      self.setLanguage = function (language) {
        self.currentLanguage = language;
        $translate.use(language);
        if (Storage) {
          localStorage.setItem('nggsLanguage', language);
        }
      }

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