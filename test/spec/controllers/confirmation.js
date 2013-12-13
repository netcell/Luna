'use strict';

describe('Controller: ConfirmationCtrl', function () {

  // load the controller's module
  beforeEach(module('lunaApp'));

  var ConfirmationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmationCtrl = $controller('ConfirmationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
