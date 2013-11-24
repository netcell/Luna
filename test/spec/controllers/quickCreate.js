'use strict';

describe('Controller: QuickcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('lunaApp'));

  var QuickcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuickcreateCtrl = $controller('QuickcreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
