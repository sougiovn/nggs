(function() {
    'use strict';

    var props = angular.module('fm.props', []);

    props.provider('fmProps', fmProps);
    function fmProps() {
        var provider = this;

        provider.$get = function() {
            return provider;
        };

        if(angular.isDefined(window.fmProps)) {
            for(var i in window.fmProps) {
                Object.defineProperty(provider, i, {
                    value: window.fmProps[i],
                    writable: false
                });
            }
            console.log(provider);
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
