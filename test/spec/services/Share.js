'use strict';

describe('Service: Share', function () {

  // load the service's module
  beforeEach(module('lunaApp'));

  // instantiate service
  var Share;
  beforeEach(inject(function (_Share_) {
    Share = _Share_;
  }));

  it('should do something', function () {
    expect(!!Share).toBe(true);
  });

});
