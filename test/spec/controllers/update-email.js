'use strict';

describe('Controller: UpdateEmailCtrl', function () {

  // load the controller's module
  beforeEach(module('lunaApp'));

  var UpdateEmailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateEmailCtrl = $controller('UpdateEmailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
