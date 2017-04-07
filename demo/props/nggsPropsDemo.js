define([
    'angular',
    'nggs.props',
    'props'
    ],
    function() {
        'use strict';

        var nggsPropsDemo = angular.module('nggsPropsDemo', ['nggs.props']);

        nggsPropsDemo.config(nggsPropsDemoConfig);
        nggsPropsDemoConfig.$inject = ['nggsPropsProvider', '$locationProvider'];
        function nggsPropsDemoConfig(nggsPropsProvider, $locationProvider) {
            $locationProvider.html5Mode({ enabled: true, requireBase: false });

            var props = {
                anyProp: 1,
                anyProps: '23'
            };

            nggsPropsProvider.set(props);
        }

        nggsPropsDemo.controller('nggsPropsDemoController', nggsPropsDemoController);
        nggsPropsDemoController.$inject = ['nggsProps'];
        function nggsPropsDemoController(nggsProps) {
            var vm = this;

            nggsProps.sessionAttr = 'This is for the session';

            console.log(nggsProps);
        }
    }
);
