const cloverleaf = require('../../index');

describe('store.getCleanStateSnapshot()', () => {
  let snapshot;

  before(() => {
    class DummyBackingStore extends cloverleaf.BackingStore {
      commit() {}
      discard() {}
      select() {}
    }

    const store = cloverleaf.createStore(new DummyBackingStore());
    snapshot = store.getCleanStateSnapshot();
  });

  specify('resulting object must have property named items', () => {
    snapshot.should.have.property('items');
  });

  specify('items must be an empty object', () => {
    snapshot.items.should.be.an.Object();
    snapshot.items.should.be.empty();
  });

  [
    'dispatchToStateSnapshot',
    'commitStateSnapshot',
    'discardStateSnapshot',
  ].forEach(requiredMethod =>
    specify(`resulting object must have method named ${requiredMethod}`, () => {
      snapshot.should.have.property(requiredMethod);
      snapshot[requiredMethod].should.be.a.Function();
    })
  );
});
