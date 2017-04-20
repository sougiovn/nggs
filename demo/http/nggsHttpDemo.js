define([
    'angular',
    'angular-translate',
    'angular-translate-loader-static-files',
    'nggs.http'
  ],
  function () {
    'use strict';

    var nggsHttpDemo = angular.module('nggsHttpDemo', ['nggs.http', 'pascalprecht.translate']);

    nggsHttpDemo.config(nggsHttpDemoConfig);
    nggsHttpDemoConfig.$inject = ['$locationProvider', '$translateProvider'];

    function nggsHttpDemoConfig($locationProvider, $translateProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $translateProvider.useStaticFilesLoader({
        prefix: '../../assets/i18n/',
        suffix: ['.json?bc=', Date.now()].join('')
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

    nggsHttpDemo.factory('nggsHttpDemoFactory', nggsHttpDemoFactory);
    nggsHttpDemoFactory.$inject = ['ggHttp'];

    function nggsHttpDemoFactory(ggHttp) {
      var methods = {
        getUsers: '@get=/photos'
      }

      return ggHttp('https://jsonplaceholder.typicode.com', methods)
    }

    nggsHttpDemo.controller('nggsHttpDemoController', nggsHttpDemoController);
    nggsHttpDemoController.$inject = ['$anchorScroll', '$translate', 'nggsHttpDemoFactory'];

    function nggsHttpDemoController($anchorScroll, $translate, nggsHttpDemoFactory) {
      $anchorScroll();

      var self = this;

      nggsHttpDemoFactory.getUsers(null).cancel();

      self.currentLanguage = $translate.preferredLanguage();

      self.setLanguage = function (language) {
        self.currentLanguage = language;
        $translate.use(language);
        if (Storage) {
          localStorage.setItem('nggsLanguage', language);
        }
      }
    }
  }
);