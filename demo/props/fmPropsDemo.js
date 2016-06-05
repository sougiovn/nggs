define([
    'angular',
    'fm.props',
    'props'
    ],
    function() {
        'use strict';

        var fmPropsDemo = angular.module('fmPropsDemo', ['fm.props']);

        fmPropsDemo.config(fmPropsDemoConfig);
        fmPropsDemoConfig.$inject = ['fmPropsProvider', '$locationProvider'];
        function fmPropsDemoConfig(fmPropsProvider, $locationProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: false });

            var props = {
                anyProp: 1,
                anyProps: '23'
            };

            fmPropsProvider.set(props);
        }

        fmPropsDemo.controller('fmPropsDemoController', fmPropsDemoController);
        fmPropsDemoController.$inject = ['fmProps'];
        function fmPropsDemoController(fmProps) {
            var vm = this;

            fmProps.sessionAttr = 'This is for the session';

            console.log(fmProps);
        }
    }
);
