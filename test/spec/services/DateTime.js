'use strict';

describe('Service: Datetime', function () {

  // load the service's module
  beforeEach(module('lunaApp'));

  // instantiate service
  var Datetime;
  beforeEach(inject(function (_Datetime_) {
    Datetime = _Datetime_;
  }));

  it('should do something', function () {
    expect(!!Datetime).toBe(true);
  });

});
