describe('cloverleaf.createStore()', () => {
  it('should throw when backing store is omitted');

  context('with backing store specified', () => {
    specify('resulting object should have method registerReducer');
    specify('resulting object should have method getCleanStateSnapshot');
    specify('resulting object should have method getStateSnapshotBySelector');
  });
});
