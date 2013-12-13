'use strict';

describe('Directive: submitInput', function () {

  // load the directive's module
  beforeEach(module('lunaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<submit-input></submit-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the submitInput directive');
  }));
});
