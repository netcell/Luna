'use strict';

describe('Service: Amduonglich', function () {

  // load the service's module
  beforeEach(module('lunaApp'));

  // instantiate service
  var Amduonglich;
  beforeEach(inject(function (_Amduonglich_) {
    Amduonglich = _Amduonglich_;
  }));

  it('should do something', function () {
    expect(!!Amduonglich).toBe(true);
  });

});
