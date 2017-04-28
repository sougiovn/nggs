(function () {
  'use strict';

  var loader = angular.module('nggs.loader', []);

  loader.provider('ggLoaderConfig', ggLoaderConfig);

  function ggLoaderConfig() {
    var provider = this;
    var active = false;
    var queryParam = 'ggloader';

    provider.$get = function () {
      return provider;
    };
    provider.setCustomActivation = setCustomActivation;
    provider.getQueryParamActivation = getQueryParamActivation;

    function setCustomActivation(queryP) {
      if (angular.isDefined(queryP) && queryP !== null) {
        if (angular.isString(queryP)) {
          queryParam = queryP || queryParam;
        } else {
          throw Error('Invalid custom activation');
        }
      }
    }

    function getQueryParamActivation() {
      return queryParam;
    }
  }

  loader.factory('ggLoader', ggLoaderFactory);
  ggLoaderFactory.$inject = ['$rootScope', '$timeout'];

  function ggLoaderFactory($rootScope, $timeout) {
    var factory = {
      show: show,
      hide: hide
    };

    return factory;

    function show(id) {
      id = angular.isDefined(id) && id !== null ? '_' + id : '';
      $timeout(function () {
        $rootScope.$broadcast('loader_show' + id);
      }, 0);
    }

    function hide(id) {
      id = angular.isDefined(id) && id !== null ? '_' + id : '';
      $timeout(function () {
        $rootScope.$broadcast('loader_hide' + id);
      }, 0);
    }
  }

  loader.factory('ggLoaderInterceptor', ggLoaderInterceptor);
  ggLoaderInterceptor.$inject = ['$q', '$rootScope', 'ggLoaderConfig'];

  function ggLoaderInterceptor($q, $rootScope, ggLoaderConfig) {
    var queryParamActication = ggLoaderConfig.getQueryParamActivation() + '=';

    var factory = {
      request: request,
      requestError: requestError,
      response: response,
      responseError: responseError
    };

    return factory;

    function request(config) {
      return show(config, resolveId(config));
    }

    function requestError(rejection) {
      return hideErr(rejection, resolveId(rejection.config));
    }

    function response(response) {
      return hide(response, resolveId(response.config));
    }

    function responseError(rejection) {
      return hideErr(rejection, resolveId(rejection.config));
    }

    function resolveId(config) {
      var id = null;
      if (angular.isDefined(config.params) && config.params !== null && angular.isDefined(config.params[ggLoaderConfig.getQueryParamActivation()])) {
        id = config.params[ggLoaderConfig.getQueryParamActivation()]
      } else {
        if (config.url.indexOf(queryParamActication) === -1) {
          return '';
        } else {
          var urlQuery = config.url.substring(config.url.indexOf('?'), config.url.length);
          id = urlQuery.substring(urlQuery.indexOf(queryParamActication) + queryParamActication.length, urlQuery.length);
          if (id.indexOf('&') > -1) {
            id = id.substring(0, id.indexOf('&'));
          }
        }
      }
      if (id === 'false' || id === false) {
        return false;
      } else if (id === 'true' || id === true) {
        id = '';
      } else {
        id = '_' + id;
      }
      return id;
    }

    function show(config, id) {
      if (id !== false) $rootScope.$broadcast('loader_show' + id);
      return config || $q.when(config);
    }

    function hide(response, id) {
      if (id !== false) $rootScope.$broadcast('loader_hide' + id);
      return response || $q.when(response);
    }

    function hideErr(rejection, id) {
      if (id !== false) $rootScope.$broadcast('loader_hide' + id);
      return $q.reject(rejection);
    }
  }

  loader.directive('ggLoader', ggLoaderDirective);

  function ggLoaderDirective() {
    var directive = {
      restrict: 'A',
      scope: {
        ggLoader: '@'
      },
      link: function (scope, element, attrs) {
        var id = scope.ggLoader;
        id = id.length > 0 ? '_' + id : '';

        var numLoadings = 0;
        angular.element(element).hide();
        scope.$on('loader_show' + id, function (args) {
          numLoadings++;
          angular.element(element).show();
        });
        scope.$on('loader_hide' + id, function (args) {
          if (numLoadings > 0 && (--numLoadings) === 0) {
            angular.element(element).hide();
          }
        });
      }
    };
    return directive;
  }

})();