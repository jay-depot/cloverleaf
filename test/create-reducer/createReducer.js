describe('cloverleaf.createReducer()', () => {
  it('should accept any number of parameters');
  it('should accept a function or an array of functions in each parameter');
  it('should throw if any parameter is not a function or an array of functions');
  it('should return a function');

  describe('the returned function', () => {
    it('should call all functions passed to cloverleaf.createReducer() in the order given');
    it('should pass the result of each function into the next function');
    it('should return a promise that resolves to the result of the last function called');

    context('a function in the chain returns a promise', () => {
      it('should wait for the promise to resolve before calling the next function');
    });

    describe('failure conditions', () => {
      context('a function in the chain returns a promise that rejects', () => {
        it('should not call the next function in the chain');
        it('should reject with the same error');
      });

      context('a function in the chain throws', () => {
        it('should not call the next function in the chain');
        it('should reject with the same error');
      });
    });
  });
});
