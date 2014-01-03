'use strict';

describe('Controller: EventlistCtrl', function () {

  // load the controller's module
  beforeEach(module('lunaApp'));

  var EventlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventlistCtrl = $controller('EventlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
