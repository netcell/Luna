'use strict';

describe('Service: Createlp', function () {

  // load the service's module
  beforeEach(module('lunaApp'));

  // instantiate service
  var Createlp;
  beforeEach(inject(function (_Createlp_) {
    Createlp = _Createlp_;
  }));

  it('should do something', function () {
    expect(!!Createlp).toBe(true);
  });

});
