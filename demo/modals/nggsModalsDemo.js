define([
    'angular',
    'angular-translate',
    'angular-translate-loader-static-files',
    'ui.bootstrap',
    'nggs.modals'
  ],
  function () {
    'use strict';

    var nggsModalsDemo = angular.module('nggsModalsDemo', ['ui.bootstrap', 'pascalprecht.translate', 'nggs.modals']);

    nggsModalsDemo.config(nggsModalsDemoConfig);
    nggsModalsDemoConfig.$inject = ['ggModalsConfigProvider', '$locationProvider', '$translateProvider'];

    function nggsModalsDemoConfig(ggModalsConfigProvider, $locationProvider, $translateProvider) {
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

      ggModalsConfigProvider.info.setTitle('Info');
      ggModalsConfigProvider.success.setTitle('Success');
      ggModalsConfigProvider.warning.setTitle('Warning');
      ggModalsConfigProvider.error.setTitle('Error');
      ggModalsConfigProvider.confirm.setTitle('Confirm');

      ggModalsConfigProvider.defaults.setControllerAs('vm').setBackdrop(true);
    }

    nggsModalsDemo.controller('nggsModalsDemoController', nggsModalsDemoController);
    nggsModalsDemoController.$inject = ['ggModals', '$anchorScroll', '$translate'];

    function nggsModalsDemoController(ggModals, $anchorScroll, $translate) {
      var vm = this;

      $anchorScroll();

      vm.info = info;
      vm.success = success;
      vm.warning = warning;
      vm.error = error;
      vm.confirm = confirm;
      vm.custom = custom;

      function info() {
        ggModals.info('info modal');
      }

      function success() {
        ggModals.success('success modal');
      }

      function warning() {
        ggModals.warning('warning modal');
      }

      function error() {
        ggModals.error('error modal');
      }

      function confirm() {
        ggModals.confirm('confirm modal');
      }

      function custom() {
        var inputs = {
          message: 'custom modal'
        };
        var options = {
          size: 'sm',
          backdrop: true
        };
        ggModals.generate('custom.html', 'nggsModalsDemoCustomController', inputs, options);
      }

      self.currentLanguage = $translate.preferredLanguage();

      self.setLanguage = function (language) {
        self.currentLanguage = language;
        $translate.use(language);
        if (Storage) {
          localStorage.setItem('nggsLanguage', language);
        }
      }
    }

    nggsModalsDemo.controller('nggsModalsDemoCustomController', nggsModalsDemoCustomController);
    nggsModalsDemoCustomController.$inject = ['$uibModalInstance', 'inputs'];

    function nggsModalsDemoCustomController($uibModalInstance, inputs) {
      var vm = this;
      vm.message = inputs.message;
    }
  }
);