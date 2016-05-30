(function() {
    'use strict';

    var props = angular.module('fm.props', []);

    props.provider('fmProps', fmProps);
    function fmProps() {
        var provider = this;

        provider.$get = function() {
            return provider;
        };

        if(angular.isDefined(window.fmPropsConfig)) {
            for(var i in window.fmPropsConfig) {
                Object.defineProperty(provider, i, {
                    value: window.fmPropsConfig[i],
                    writable: false
                });
            }
        }

        Object.defineProperty(provider, 'set', {
            value: function(props) {
                for(var i in props) {
                    Object.defineProperty(provider, i, {
                        value: props[i],
                        writable: false
                    });
                }
            },
            writable: false
        });
    }
})();
