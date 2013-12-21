'use strict';

describe('Directive: tutorial', function () {

  // load the directive's module
  beforeEach(module('lunaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tutorial></tutorial>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tutorial directive');
  }));
});
