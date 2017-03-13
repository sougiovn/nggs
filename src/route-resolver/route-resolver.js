define([
    'angular',
    'ngRoute',
    'CommonModule',
    'common/factories/utils.factory'
  ],
  function () {
    angular.module('CommonModule').provider('routeResolver', routeResolver);

    routeResolver.$inject = ['#$routeProvider', 'UtilsService'];

    function routeResolver($routeProvider, UtilsService) {
      var provider = this;
      var defaultConfig = {
        baseDir: './routes',
        controllerSuffix: 'Controller',
        controllerFileSuffix: '.controller',
        controllerAs: 'vm',
        isDynamicallyLoaded: true,
        fileNameSeparator: '-'
      }

      provider.$get = function () {
        return provider;
      }

      provider.setBaseDirectory = setBaseDirectory;
      provider.setControllerSuffix = setControllerSuffix;
      provider.setControllerFileSuffix = setControllerFileSuffix;
      provider.setControllerAs = setControllerAs;
      provider.isDynamicallyLoaded = isDynamicallyLoaded;
      provider.setFileNameSeparator = setFileNameSeparator;
      provider.generate = generate;

      function setBaseDirectory(baseDirP) {
        if (UtilsService.isString(baseDirP)) {
          defaultConfig.baseDir = baseDirP;
          return provider;
        } else {
          throw Error('Base directory must be a String');
        }
      }

      function setControllerSuffix(controllerSuffixP) {
        if (UtilsService.isString(controllerSuffixP)) {
          defaultConfig.controllerSuffix = controllerSuffixP;
          return provider;
        } else {
          throw Error('Controller suffix must be a String');
        }
      }

      function setControllerFileSuffix(controllerFileSuffixP) {
        if (UtilsService.isString(controllerFileSuffixP)) {
          defaultConfig.controllerFileSuffix = controllerFileSuffixP;
          return provider;
        } else {
          throw Error('Controller file suffix must be a String');
        }
      }

      function setControllerAs(controllerAsP) {
        if (UtilsService.isString(controllerAsP)) {
          defaultConfig.controllerAs = controllerAsP;
          return provider;
        } else {
          throw Error('Controller as alias must be a String');
        }
      }

      function isDynamicallyLoaded(isDynamicallyLoadedP) {
        if (UtilsService.isBoolean(isDynamicallyLoadedP)) {
          defaultConfig.isDynamicallyLoaded = isDynamicallyLoadedP;
          return provider;
        } else {
          throw Error('Is Dynamically Loaded must be a Boolean');
        }
      }

      function setFileNameSeparator(fileNameSeparatorP) {
        if (UtilsService.isString(fileNameSeparatorP)) {
          defaultConfig.fileNameSeparator = fileNameSeparatorP;
          return provider;
        } else {
          throw Error('File name separator must be a String');
        }
      }

      function generate(routes) {
        if (!UtilsService.isArray(routes)) {
          throw Error('routeResolver only accepts an Array');
        }

        routes.forEach(function (item) {
          var route = {};
          if (UtilsService.isObject(item)) {
            route = item;
            route.isDynamicallyLoaded = UtilsService.isDefined(item.isDynamicallyLoaded) ? item.isDynamicallyLoaded : defaultConfig.isDynamicallyLoaded;
          } else if (UtilsService.isString(item)) {
            route.url = item;
            route.baseName = resolveBaseName(item);
            route.isDynamicallyLoaded = defaultConfig.isDynamicallyLoaded;
            if (UtilsService.isDefined(defaultConfig.controllerAs)) {
              route.controllerAs = defaultConfig.controllerAs;
            }
          }

          $routeProvider.when(route.url, routeResolver(route));
        });
      }

      function resolveBaseName(url) {
        var baseName = url;
        if (url.indexOf('/:') > -1) {
          var paths = url.split(/\//);
          paths.forEach(function (item) {
            if (item.length > 0 && item.indexOf(':') < 0) {
              baseName += ['/', item].join('');
            }
          });
        }
        return baseName;
      }

      function routeResolver(routeConfig) {
        routeConfig.fileName = routeConfig.baseName.replace(/\//g, defaultConfig.fileNameSeparator);

        var routeDef = {
          templateUrl: routeConfig.templateUrl || [defaultConfig.baseDir, routeConfig.baseName, routeConfig.fileName, '.html'].join(''),
          controller: routeConfig.controller || [routeConfig.fileName, defaultConfig.controllerSuffix].join(''),
          resolve: routeConfig.resolve || {}
        }

        if (UtilsService.isDefined(defaultConfig.controllerAs)) {
          routeDef.controllerAs = defaultConfig.controllerAs;
        }

        if (routeConfig.isDynamicallyLoaded) {
          routeDef.resolve['routeResolver'] = ['$q', '$rootScope', function ($q, $rootScope) {
            var dependency = routeConfig.controllerFile || [defaultConfig.baseDir, routeConfig.baseName, routeConfig.fileName, defaultConfig.controllerFileSuffix, '.js'].join('');
            return resolveDependency($q, $rootScope, dependency)
          }];
        }

        return routeDef;
      }

      function resolveDependency($q, $rootScope, dependency) {
        var defer = $q.defer();
        require([dependency], function () {
          defer.resolve();
          $rootScope.$apply();
        });
        return defer.promise;
      }
    }

  });