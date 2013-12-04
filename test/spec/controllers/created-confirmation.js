'use strict';

describe('Controller: CreatedConfirmationCtrl', function () {

  // load the controller's module
  beforeEach(module('lunaApp'));

  var CreatedConfirmationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatedConfirmationCtrl = $controller('CreatedConfirmationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
