describe('cloverleaf.BackingStore', () => {
  it('should throw if constructed directly');
  context('when extended by another class', () => {
    it('should throw if select method is not defined by child class');
    it('should throw if commit method is not defined by child class');
    it('should throw if discard method is not defined by child class');
  });
});
