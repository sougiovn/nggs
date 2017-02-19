define([
    'angular',
    'angular-translate',
    'angular-translate-loader-static-files'
  ],
  function () {
    'use strict';

    var indexApp = angular.module('indexApp', ['pascalprecht.translate']);

    indexApp.config(config);

    config.$injector = ['$translateProvider']

    function config($translateProvider) {
      $translateProvider.useStaticFilesLoader({files: [{prefix: 'assets/i18n/',suffix: '.json'}]});
      var preferredLanguage = 'en'
      if (Storage) {
        var aux = localStorage.getItem('nggsLanguage');
        if (aux) {
          preferredLanguage = aux;
        }
      }
      $translateProvider.preferredLanguage(preferredLanguage);
    }

    indexApp.controller('indexController', indexController);

    indexController.$injector = ['$translate'];

    function indexController($translate) {
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
)