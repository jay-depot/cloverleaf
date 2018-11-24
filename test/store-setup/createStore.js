const cloverleaf = require('../../index');
const should = require('should');

describe('cloverleaf.createStore()', () => {
  it('should throw when backing store is omitted', () => {
    should.throws(() => cloverleaf.createStore());
  });

  context('with backing store specified', () => {
    class DummyBackingStore extends cloverleaf.BackingStore {
      commitChanges() {}
      discardChanges() {}
      newItems() {}
      selectItems() {}
    }

    let store;

    before(() => {
      store = cloverleaf.createStore(new DummyBackingStore());
    });

    [
      'registerReducer',
      'getCleanStateSnapshot',
      'getStateSnapshotBySelector',
    ].forEach(requiredMethod => {
      specify(`resulting object should have method ${requiredMethod}`, () => {
        store.should.have.property(requiredMethod);
        store[requiredMethod].should.be.a.Function();
      });
    });
  });
});
