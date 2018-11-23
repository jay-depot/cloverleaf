describe('cloverleaf.BackingStore', () => {
  it('should throw if constructed directly');
  context('when extended by another class', () => {
    describe('constructor', () => {
      it('should throw if select method is not defined by child class');
      it('should throw if property select is not a function in child class');
      it('should throw if commit method is not defined by child class');
      it('should throw if property commit is not a function in child class');
      it('should throw if discard method is not defined by child class');
      it('should throw if property discard is not a function in child class');
    });
  });
});
