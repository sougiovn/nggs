define([
    'angular',
    'ui.bootstrap',
    'nggs.modals'
    ],
    function() {
        'use strict';

        var nggsModalsDemo = angular.module('nggsModalsDemo', ['ui.bootstrap', 'nggs.modals']);

        nggsModalsDemo.config(nggsModalsDemoConfig);
        nggsModalsDemoConfig.$inject = ['ggModalsConfigProvider', '$locationProvider'];
        function nggsModalsDemoConfig(ggModalsConfigProvider, $locationProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: false });

            ggModalsConfigProvider.info.setTitle('Info');
            ggModalsConfigProvider.success.setTitle('Success');
            ggModalsConfigProvider.warning.setTitle('Warning');
            ggModalsConfigProvider.error.setTitle('Error');
            ggModalsConfigProvider.confirm.setTitle('Confirm');

            ggModalsConfigProvider.defaults.setControllerAs('vm').setBackdrop(true);
        }

        nggsModalsDemo.controller('nggsModalsDemoController', nggsModalsDemoController);
        nggsModalsDemoController.$inject = ['ggModals', '$anchorScroll'];
        function nggsModalsDemoController(ggModals, $anchorScroll) {
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
        }

        nggsModalsDemo.controller('nggsModalsDemoCustomController', nggsModalsDemoCustomController);
        nggsModalsDemoCustomController.$inject = ['$uibModalInstance', 'inputs'];
        function nggsModalsDemoCustomController($uibModalInstance, inputs) {
            var vm = this;
            vm.message = inputs.message;
        }
    }
);
