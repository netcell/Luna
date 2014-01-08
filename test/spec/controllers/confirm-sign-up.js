'use strict';

describe('Controller: ConfirmSignUpCtrl', function () {

  // load the controller's module
  beforeEach(module('lunaApp'));

  var ConfirmSignUpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmSignUpCtrl = $controller('ConfirmSignUpCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
