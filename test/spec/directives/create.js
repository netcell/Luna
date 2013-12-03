'use strict';

describe('Directive: create', function () {

  // load the directive's module
  beforeEach(module('lunaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create></create>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the create directive');
  }));
});