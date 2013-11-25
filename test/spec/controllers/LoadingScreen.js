'use strict';

describe('Controller: LoadingscreenCtrl', function () {

  // load the controller's module
  beforeEach(module('lunaApp'));

  var LoadingscreenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoadingscreenCtrl = $controller('LoadingscreenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
