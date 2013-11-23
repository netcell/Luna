'use strict';

describe('Directive: quickCreateHome', function () {

  // load the directive's module
  beforeEach(module('lunaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<quick-create-home></quick-create-home>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the quickCreateHome directive');
  }));
});
