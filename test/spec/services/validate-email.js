'use strict';

describe('Service: ValidateEmail', function () {

  // load the service's module
  beforeEach(module('lunaApp'));

  // instantiate service
  var ValidateEmail;
  beforeEach(inject(function (_ValidateEmail_) {
    ValidateEmail = _ValidateEmail_;
  }));

  it('should do something', function () {
    expect(!!ValidateEmail).toBe(true);
  });

});
