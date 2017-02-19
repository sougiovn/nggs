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

      $translateProvider.useStaticFilesLoader({prefix: '../../assets/i18n/',suffix: '.json'});
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
      var baseUrl = 'http://localhost:8000/api';
      // var urls = [
      //   ['get@get=/test', {headers: ['lalala'], params:{teste:'lalala'}}],
      //   'post@post=/test/:cod'
      // ];

      var urls = {
        get: ['@get=/test', {headers: ['lalala'], params:{teste:'lalala'}}],
        post: ['@post=/test', {data:'defaultData', params: {teste:'postt'}}]
      }

      var factory = ggHttp(baseUrl, urls);

      return factory;
    }

    nggsHttpDemo.controller('nggsHttpDemoController', nggsHttpDemoController);

    nggsHttpDemoController.$inject = ['$anchorScroll', '$translate'];

    function nggsHttpDemoController($anchorScroll, $translate) {
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
    }
  }
);