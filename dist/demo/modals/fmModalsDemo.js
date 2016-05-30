define([
    'angular',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'fm.modals'
    ],
    function() {
        'use strict';

        var fmModalsDemo = angular.module('fmModalsDemo', ['ui.bootstrap', 'fm.modals']);

        fmModalsDemo.config(fmModalsDemoConfig);
        fmModalsDemoConfig.$inject = ['fmModalsConfigProvider', '$locationProvider'];
        function fmModalsDemoConfig(fmModalsConfigProvider, $locationProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: false });

            fmModalsConfigProvider.info.setTitle('Info').setOptions({ backdrop: true });
            fmModalsConfigProvider.success.setTitle('Success').setOptions({ backdrop: true });
            fmModalsConfigProvider.warning.setTitle('Warning').setOptions({ backdrop: true });
            fmModalsConfigProvider.error.setTitle('Error').setOptions({ backdrop: true });
            fmModalsConfigProvider.confirm.setTitle('Confirm').setOptions({ backdrop: true });

            fmModalsConfigProvider.defaults.setControllerAs('vm').setBackdrop(true);
        }

        fmModalsDemo.controller('fmModalsDemoController', fmModalsDemoController);
        fmModalsDemoController.$inject = ['fmModalsFactory', '$anchorScroll'];
        function fmModalsDemoController(fmModalsFactory, $anchorScroll) {
            var vm = this;

            $anchorScroll();

            vm.info = info;
            vm.success = success;
            vm.warning = warning;
            vm.error = error;
            vm.confirm = confirm;
            vm.custom = custom;

            function info() {
                fmModalsFactory.info('info modal');
            }
            function success() {
                fmModalsFactory.success('success modal');
            }
            function warning() {
                fmModalsFactory.warning('warning modal');
            }
            function error() {
                fmModalsFactory.error('error modal');
            }
            function confirm() {
                fmModalsFactory.confirm('confirm modal');
            }
            function custom() {
                var inputs = {
                    message: 'custom modal'
                };
                var options = {
                    size: 'sm',
                    backdrop: true
                };
                fmModalsFactory.generate('custom.html', 'fmModalsDemoCustomController', inputs, options);
            }
        }

        fmModalsDemo.controller('fmModalsDemoCustomController', fmModalsDemoCustomController);
        fmModalsDemoCustomController.$inject = ['$uibModalInstance', 'inputs'];
        function fmModalsDemoCustomController($uibModalInstance, inputs) {
            var vm = this;
            vm.message = inputs.message;
        }
    }
);
