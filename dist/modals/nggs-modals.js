(function () {
  'use strict';

  var modals = angular.module('nggs.modals', ['ui.bootstrap']);

  modals.provider('ggModalsConfig', ggModalsConfig);

  function ggModalsConfig() {
    var provider = this;

    provider.$get = function () {
      return provider;
    };

    var defaults = {
      animation: true,
      backdrop: true,
      backdropClass: '',
      bindToController: false,
      controllerAs: undefined,
      keyboard: true,
      openedClass: 'modal-open',
      size: 'md',
      windowClass: '',
      windowTemplateUrl: undefined,
      windowTopClass: ''
    };

    provider.defaults = {
      getAnimation: getDefaultAnimation,
      setAnimation: setDefaultAnimation,
      getBackdrop: getDefaultBackdrop,
      setBackdrop: setDefaultBackdrop,
      getBackdropClass: getDefaultBackdropClass,
      setBackdropClass: setDefaultBackdropClass,
      getBindToController: getDefaultBindToController,
      setBindToController: setDefaultBindToController,
      getControllerAs: getDefaultControllerAs,
      setControllerAs: setDefaultControllerAs,
      getKeyboard: getDefaultKeyboard,
      setKeyboard: setDefaultKeyboard,
      getOpenedClass: getDefaultOpenedClass,
      setOpenedClass: setDefaultOpenedClass,
      getSize: getDefaultSize,
      setSize: setDefaultSize,
      getWindowClass: getDefaultWindowClass,
      setWindowClass: setDefaultWindowClass,
      getWindowTemplateUrl: getDefaultWindowTemplateUrl,
      setWindowTemplateUrl: setDefaultWindowTemplateUrl,
      getWindowTopClass: getDefaultWindowTopClass,
      setWindowTopClass: setDefaultWindowTopClass
    };

    function getDefaultAnimation() {
      return defaults.animation;
    }

    function setDefaultAnimation(animation) {
      if (typeof animation === 'boolean') {
        defaults.animation = animation;
        return provider.defaults;
      } else {
        throw Error('setAnimation() expects a boolean as parameter');
      }
    }

    function getDefaultBackdrop() {
      return defaults.backdrop;
    }

    function setDefaultBackdrop(backdrop) {
      if (typeof backdrop === 'boolean') {
        defaults.backdrop = backdrop;
        return provider.defaults;
      } else if (angular.isString(backdrop) && backdrop == 'static') {
        defaults.backdrop = backdrop;
        return provider.defaults;
      } else {
        throw Error('setBackdrop() expects one of those values as parameter: true, false and \'static\'');
      }
    }

    function getDefaultBackdropClass() {
      return defaults.backdropClass;
    }

    function setDefaultBackdropClass(backdropClass) {
      if (angular.isString(backdropClass)) {
        defaults.backdropClass = backdropClass;
        return provider.defaults;
      } else {
        throw Error('setBackdropClass() expects a string as parameter');
      }
    }

    function getDefaultBindToController() {
      return defaults.bindToController;
    }

    function setDefaultBindToController(bindToController) {
      if (typeof bindToController === 'boolean') {
        defaults.bindToController = bindToController;
        return provider.defaults;
      } else {
        throw Error('setBindToController() expects a boolan as parameter');
      }
    }

    function getDefaultControllerAs() {
      return defaults.controllerAs;
    }

    function setDefaultControllerAs(controllerAs) {
      if (angular.isString(controllerAs)) {
        defaults.controllerAs = controllerAs;
        return provider.defaults;
      } else {
        throw Error('setControllerAs() expects a string as parameter');
      }
    }

    function getDefaultKeyboard() {
      return defaults.keyboard;
    }

    function setDefaultKeyboard(keyboard) {
      if (typeof keyboard === 'boolean') {
        defaults.keyboard = keyboard;
        return provider.defaults;
      } else {
        throw Error('setKeyboard() expects a boolean as parameter');
      }
    }

    function getDefaultOpenedClass() {
      return defaults.openedClass;
    }

    function setDefaultOpenedClass(openedClass) {
      if (angular.isString(openedClass)) {
        defaults.openedClass = openedClass;
        return provider.defaults;
      } else {
        throw Error('setOpenedClass() expects a string as parameter');
      }
    }

    function getDefaultSize() {
      return defaults.size;
    }

    function setDefaultSize(size) {
      if (angular.isString(size)) {
        defaults.size = size;
        return provider.defaults;
      } else {
        throw Error('setSize() expects a string as parameter');
      }
    }

    function getDefaultWindowClass() {
      return defaults.windowClass;
    }

    function setDefaultWindowClass(windowClass) {
      if (angular.isString(windowClass)) {
        defaults.windowClass = windowClass;
        return provider.defaults;
      } else {
        throw Error('setWindowClass() expects a string as parameter');
      }
    }

    function getDefaultWindowTemplateUrl() {
      return defaults.windowTemplateUrl;
    }

    function setDefaultWindowTemplateUrl(windowTemplateUrl) {
      if (angular.isString(windowTemplateUrl)) {
        defaults.windowTemplateUrl = windowTemplateUrl;
        return provider.defaults;
      } else {
        throw Error('setWindowTemplateUrl() expects a string as parameter');
      }
    }

    function getDefaultWindowTopClass() {
      return defaults.windowTopClass;
    }

    function setDefaultWindowTopClass(windowTopClass) {
      if (angular.isString(windowTopClass)) {
        defaults.windowTopClass = windowTopClass;
        return provider.defaults;
      } else {
        throw Error('setWindowTopClass() expects a string as parameter');
      }
    }

    var config = {
      info: {
        templateUrl: 'nggs.modals/template/info.html',
        controllerName: 'ggModalsCommonController',
        options: {
          backdrop: 'static',
          controllerAs: 'vm'
        },
        closeButtonLabel: 'Ok'
      },
      success: {
        templateUrl: 'nggs.modals/template/success.html',
        controllerName: 'ggModalsCommonController',
        options: {
          backdrop: 'static',
          controllerAs: 'vm'
        },
        closeButtonLabel: 'Ok'
      },
      warning: {
        templateUrl: 'nggs.modals/template/warning.html',
        controllerName: 'ggModalsCommonController',
        options: {
          backdrop: 'static',
          controllerAs: 'vm'
        },
        closeButtonLabel: 'Ok'
      },
      error: {
        templateUrl: 'nggs.modals/template/error.html',
        controllerName: 'ggModalsCommonController',
        options: {
          backdrop: 'static',
          controllerAs: 'vm'
        },
        closeButtonLabel: 'Ok'
      },
      confirm: {
        templateUrl: 'nggs.modals/template/confirm.html',
        controllerName: 'ggModalsCommonController',
        options: {
          backdrop: 'static',
          controllerAs: 'vm'
        },
        cancelButtonLabel: 'Cancel',
        confirmButtonLabel: 'Confirm'
      }
    };

    provider.info = {
      getTemplateUrl: function () {
        return getTemplateUrl('info');
      },
      setTemplateUrl: function (templateUrl) {
        return setTemplateUrl.apply({}, ['info', templateUrl]);
      },
      getControllerName: function () {
        return getControllerName('info');
      },
      setControllerName: function (controllerName) {
        return setControllerName.apply({}, ['info', controllerName]);
      },
      getTitle: function () {
        return getTitle('info');
      },
      setTitle: function (title) {
        return setTitle.apply({}, ['info', title]);
      },
      getOptions: function () {
        return getOptions('info');
      },
      setOptions: function (options) {
        return setOptions.apply({}, ['info', options]);
      },
      getCloseButtonLabel: function () {
        return getButtonLabel('info', 'closeButtonLabel');
      },
      setCloseButtonLabel: function (closeButtonLabel) {
        return setButtonLabel.apply({}, ['info', 'closeButtonLabel', closeButtonLabel]);
      },
      set: function (config) {
        return setConfig.apply({}, ['info', config]);
      }
    };
    provider.success = {
      getTemplateUrl: function () {
        return getTemplateUrl('success');
      },
      setTemplateUrl: function (templateUrl) {
        return setTemplateUrl.apply({}, ['success', templateUrl]);
      },
      getControllerName: function () {
        return getControllerName('success');
      },
      setControllerName: function (controllerName) {
        return setControllerName.apply({}, ['success', controllerName]);
      },
      getTitle: function () {
        return getTitle('success');
      },
      setTitle: function (title) {
        return setTitle.apply({}, ['success', title]);
      },
      getOptions: function () {
        return getOptions('success');
      },
      setOptions: function (options) {
        return setOptions.apply({}, ['success', options]);
      },
      getCloseButtonLabel: function () {
        return getButtonLabel('success', 'closeButtonLabel');
      },
      setCloseButtonLabel: function (closeButtonLabel) {
        return setButtonLabel.apply({}, ['success', 'closeButtonLabel', closeButtonLabel]);
      },
      set: function (config) {
        return setConfig.apply({}, ['success', config]);
      }
    };
    provider.warning = {
      getTemplateUrl: function () {
        return getTemplateUrl('warning');
      },
      setTemplateUrl: function (templateUrl) {
        return setTemplateUrl.apply({}, ['warning', templateUrl]);
      },
      getControllerName: function () {
        return getControllerName('warning');
      },
      setControllerName: function (controllerName) {
        return setControllerName.apply({}, ['warning', controllerName]);
      },
      getTitle: function () {
        return getTitle('warning');
      },
      setTitle: function (title) {
        return setTitle.apply({}, ['warning', title]);
      },
      getOptions: function () {
        return getOptions('warning');
      },
      setOptions: function (options) {
        return setOptions.apply({}, ['warning', options]);
      },
      getCloseButtonLabel: function () {
        return getButtonLabel('warning', 'closeButtonLabel');
      },
      setCloseButtonLabel: function (closeButtonLabel) {
        return setButtonLabel.apply({}, ['warning', 'closeButtonLabel', closeButtonLabel]);
      },
      set: function (config) {
        return setConfig.apply({}, ['warning', config]);
      }
    };
    provider.error = {
      getTemplateUrl: function () {
        return getTemplateUrl('error');
      },
      setTemplateUrl: function (templateUrl) {
        return setTemplateUrl.apply({}, ['error', templateUrl]);
      },
      getControllerName: function () {
        return getControllerName('error');
      },
      setControllerName: function (controllerName) {
        return setControllerName.apply({}, ['error', controllerName]);
      },
      getTitle: function () {
        return getTitle('error');
      },
      setTitle: function (title) {
        return setTitle.apply({}, ['error', title]);
      },
      getOptions: function () {
        return getOptions('error');
      },
      setOptions: function (options) {
        return setOptions.apply({}, ['error', options]);
      },
      getCloseButtonLabel: function () {
        return getButtonLabel('error', 'closeButtonLabel');
      },
      setCloseButtonLabel: function (closeButtonLabel) {
        return setButtonLabel.apply({}, ['error', 'closeButtonLabel', closeButtonLabel]);
      },
      set: function (config) {
        return setConfig.apply({}, ['error', config]);
      }
    };
    provider.confirm = {
      getTemplateUrl: function () {
        return getTemplateUrl('confirm');
      },
      setTemplateUrl: function (templateUrl) {
        return setTemplateUrl.apply({}, ['confirm', templateUrl]);
      },
      getControllerName: function () {
        return getControllerName('confirm');
      },
      setControllerName: function (controllerName) {
        return setControllerName.apply({}, ['confirm', controllerName]);
      },
      getTitle: function () {
        return getTitle('confirm');
      },
      setTitle: function (title) {
        return setTitle.apply({}, ['confirm', title]);
      },
      getOptions: function () {
        return getOptions('confirm');
      },
      setOptions: function (options) {
        return setOptions.apply({}, ['confirm', options]);
      },
      getCancelButtonLabel: function () {
        return getButtonLabel('confirm', 'cancelButtonLabel');
      },
      setCancelButtonLabel: function (cancelButtonLabel) {
        return setButtonLabel.apply({}, ['confirm', 'cancelButtonLabel', cancelButtonLabel]);
      },
      getConfirmButtonLabel: function () {
        return getButtonLabel('confirm', 'confirmButtonLabel');
      },
      setConfirmButtonLabel: function (confirmButtonLabel) {
        return setButtonLabel.apply({}, ['confirm', 'confirmButtonLabel', confirmButtonLabel]);
      },
      set: function (config) {
        return setConfig.apply({}, ['confirm', config]);
      }
    };

    function getButtonLabel(configType, buttonLabel) {
      return config[configType][buttonLabel];
    }

    function setButtonLabel(configType, buttonLabel, buttonLabelValue) {
      if (angular.isString(buttonLabelValue)) {
        config[configType][buttonLabel] = buttonLabelValue;
        return provider[configType];
      } else {
        throw Error('method for setting button label expects a string parameter');
      }
    }

    function setConfig(configType, configP) {
      if (angular.isObject(configP)) {
        if (angular.isDef(configP.templateUrl)) {
          setTemplateUrl(configType, configP.templateUrl);
        } else {
          throw Error('set() expects an object with an attribute: templateUrl');
        }
        if (angular.isDefined(configP.controllerName) && configP.controllerName !== null) {
          setControllerName(configType, configP.controllerName);
        } else {
          throw Error('set() expects an object with an attribute: controllerName');
        }
        if (angular.isDefined(configP.title) && configP.title !== null) {
          setTitle(configType, configP.title);
        }
      } else {
        throw Error('set() expects an object with the attributes: templateUrl and controllerName');
      }
    }

    function getControllerName(configType) {
      return config[configType].controllerName;
    }

    function setControllerName(configType, controllerName) {
      if (angular.isString(controllerName)) {
        config[configType].controllerName = angular.copy(controllerName);
        return provider[configType];
      } else {
        throw Error('setControllerName() expects a string as parameter');
      }
    }

    function getTemplateUrl(configType) {
      return config[configType].templateUrl;
    }

    function setTemplateUrl(configType, templateUrl) {
      if (angular.isString(templateUrl)) {
        config[configType].templateUrl = angular.copy(templateUrl);
        return provider[configType];
      } else {
        throw Error('setTemplateUrl() expects a string as parameter');
      }
    }

    function getOptions(configType) {
      return angular.copy(config[configType].options);
    }

    function setOptions(configType, options) {
      if (angular.isObject(options)) {
        config[configType].options = angular.copy(options);
        return provider[configType];
      } else {
        throw Error('setOptions() expects an object as parameter');
      }
    }

    function getTitle(configType) {
      return config[configType].title;
    }

    function setTitle(configType, title) {
      if (angular.isString(title)) {
        config[configType].title = angular.copy(title);
        return provider[configType];
      } else {
        throw Error('setTitle() expects a string as parameter');
      }
    }
  }

  modals.factory('ggModals', ggModals);
  ggModals.$inject = ['$uibModal', 'ggModalsConfig'];

  function ggModals($uibModal, ggModalsConfig) {
    var factory = {
      info: info,
      success: success,
      warning: warning,
      error: error,
      confirm: confirm,
      generate: generate
    };

    var config = {
      defaults: ggModalsConfig.defaults,
      info: ggModalsConfig.info,
      success: ggModalsConfig.success,
      warning: ggModalsConfig.warning,
      error: ggModalsConfig.error,
      confirm: ggModalsConfig.confirm
    };

    return factory;

    function resolveParams(type, args) {
      var inputs = {};
      var options = {};
      switch (args.length) {
        case 0:
          inputs.title = config[type].getTitle();
          break;
        case 1:
          inputs = {
            title: config[type].getTitle(),
            message: args[0]
          };
          break;
        case 2:
          if (angular.isObject(args[1])) {
            inputs = {
              title: config[type].getTitle(),
              message: args[0]
            };
            options = args[1];
          } else {
            inputs = {
              title: args[0],
              message: args[1]
            };
          }
          break;
        case 3:
          inputs = {
            title: args[0],
            message: args[1]
          };
          options = args[2];
          break;
      }
      return {
        inputs: inputs,
        options: resolveOptions(type, options)
      };
    }

    function resolveOptions(type, optionsP) {
      var options = config[type].getOptions();
      return extendsObject(options, optionsP)
    }

    function info() {
      var params = resolveParams.apply({}, ['info', arguments]);
      params.inputs.closeButtonLabel = config.info.getCloseButtonLabel();
      return generate(config.info.getTemplateUrl(), config.info.getControllerName(), params.inputs, params.options);
    }

    function success() {
      var params = resolveParams.apply({}, ['success', arguments]);
      params.inputs.closeButtonLabel = config.success.getCloseButtonLabel();
      return generate(config.success.getTemplateUrl(), config.success.getControllerName(), params.inputs, params.options);
    }

    function warning() {
      var params = resolveParams.apply({}, ['warning', arguments]);
      params.inputs.closeButtonLabel = config.warning.getCloseButtonLabel();
      return generate(config.warning.getTemplateUrl(), config.warning.getControllerName(), params.inputs, params.options);
    }

    function error() {
      var params = resolveParams.apply({}, ['error', arguments]);
      params.inputs.closeButtonLabel = config.error.getCloseButtonLabel();
      return generate(config.error.getTemplateUrl(), config.error.getControllerName(), params.inputs, params.options);
    }

    function confirm() {
      var params = resolveParams.apply({}, ['confirm', arguments]);
      params.inputs.cancelButtonLabel = config.confirm.getCancelButtonLabel();
      params.inputs.confirmButtonLabel = config.confirm.getConfirmButtonLabel();
      return generate(config.confirm.getTemplateUrl(), config.confirm.getControllerName(), params.inputs, params.options);
    }

    function generate(templateUrl, controllerName, inputs, optionsP) {
      inputs = inputs || {};
      optionsP = optionsP || {};

      if (angular.isDefined(optionsP.inputs) && optionsP.inputs !== null) {
        inputs = extendsObject(inputs, optionsP.inputs)
      }

      var options = {
        animation: optionsP.animation || config.defaults.getAnimation(),
        backdrop: optionsP.backdrop || config.defaults.getBackdrop(),
        backdropClass: optionsP.backdropClass || config.defaults.getBackdropClass(),
        bindToController: optionsP.bindToController || config.defaults.getBindToController(),
        controller: controllerName,
        keyboard: optionsP.keyboard || config.defaults.getKeyboard(),
        openedClass: optionsP.openedClass || config.defaults.getOpenedClass(),
        resolve: {
          inputs: function () {
            return inputs;
          }
        },
        size: optionsP.size || config.defaults.getSize(),
        templateUrl: templateUrl,
        windowClass: optionsP.windowClass || config.defaults.getWindowClass(),
        windowTopClass: optionsP.windowTopClass || config.defaults.getWindowTopClass()
      };

      if (optionsP.appendTo) {
        options.appendTo = optionsP.appendTo;
      }
      if (optionsP.controllerAs || config.defaults.getControllerAs()) {
        options.controllerAs = optionsP.controllerAs || config.defaults.getControllerAs();
      }
      if (optionsP.windowTemplateUrl || config.defaults.getWindowTemplateUrl()) {
        options.windowTemplateUrl = optionsP.windowTemplateUrl || config.defaults.getWindowTemplateUrl();
      }

      return $uibModal.open(options);
    }
  }

  modals.run(run);
  run.$inject = ['$templateCache'];

  function run($templateCache) {
    $templateCache.put('nggs.modals/template/info.html', '<div class="modal-header"><i class="fa fa-info-circle fa-2x pull-left text-info"></i><h4 class="modal-title">{{ vm.title }}</h4></div><div class="modal-body bg-info" ng-bind-html="vm.message"></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="vm.close()">{{ vm.closeButtonLabel }}</button></div>');
    $templateCache.put('nggs.modals/template/success.html', '<div class="modal-header"><i class="fa fa-check-circle fa-2x pull-left text-success"></i><h4 class="modal-title">{{ vm.title }}</h4></div><div class="modal-body bg-success" ng-bind-html="vm.message"></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="vm.close()">{{ vm.closeButtonLabel }}</button></div>');
    $templateCache.put('nggs.modals/template/warning.html', '<div class="modal-header"><i class="fa fa-exclamation-circle fa-2x text-warning pull-left"></i><h4 class="modal-title">{{ vm.title }}</h4></div><div class="modal-body bg-warning" ng-bind-html="vm.message"></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="vm.close()">{{ vm.closeButtonLabel }}</button></div>');
    $templateCache.put('nggs.modals/template/error.html', '<div class="modal-header"><i class="fa fa-times-circle fa-2x text-danger pull-left"></i><h4 class="modal-title">{{ vm.title }}</h4></div><div class="modal-body bg-danger" ng-bind-html="vm.message"></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="vm.close()">{{ vm.closeButtonLabel }}</button></div>');
    $templateCache.put('nggs.modals/template/confirm.html', '<div class="modal-header"><i class="fa fa-question-circle fa-2x pull-left"></i><h4 class="modal-title">{{ vm.title }}</h4></div><div class="modal-body" ng-bind-html="vm.message"></div><div class="modal-footer"><button class="btn btn-default" type="button" ng-click="vm.close(false)">{{ vm.cancelButtonLabel }}</button><button class="btn btn-primary" type="button" ng-click="vm.close(true)">{{ vm.confirmButtonLabel }}</button></div>');
  }

  modals.controller('ggModalsCommonController', ggModalsCommonController);
  ggModalsCommonController.$inject = ['$uibModalInstance', 'inputs', '$sce'];

  function ggModalsCommonController($uibModalInstance, inputs, $sce) {
    var vm = this;
    extendsObject(vm, inputs);

    if (angular.isDefined(vm.message) && vm.message !== null) {
      vm.message = $sce.trustAsHtml(vm.message);
    }

    vm.close = close;

    function close() {
      $uibModalInstance.close(arguments[0]);
    }
  }

  function extendsObject(dst, src) {
    if (typeof dst !== 'object' || typeof src !== 'object') {
      throw Error('extendsObject only accepts Objects');
    }
    Object.keys(src).forEach(function (item) {
      dst[item] = src[item];
    });
    return dst;
  }

})();