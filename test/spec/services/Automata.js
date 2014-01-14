'use strict';

describe('Service: Automata', function () {

  // load the service's module
  beforeEach(module('lunaApp'));

  // instantiate service
  var Automata;
  beforeEach(inject(function (_Automata_) {
    Automata = _Automata_;
  }));

  it('should do something', function () {
    expect(!!Automata).toBe(true);
  });

});
