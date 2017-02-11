(function () {
  'use strict';

  var props = angular.module('nggs.props', []);

  props.provider('nggsProps', nggsProps);

  function nggsProps() {
    var provider = this;

    provider.$get = function () {
      return provider;
    };

    if (window.nggsProps !== undefined) {
      for (var i in window.nggsProps) {
        Object.defineProperty(provider, i, {
          value: window.nggsProps[i],
          writable: false
        });
      }
      console.log(provider);
    }

    Object.defineProperty(provider, 'set', {
      value: function (props) {
        for (var i in props) {
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