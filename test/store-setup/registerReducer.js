const cloverleaf = require('../../index');
const should = require('should');

describe('store.registerReducer()', () => {
  class DummyBackingStore extends cloverleaf.BackingStore {
    commit() {}
    discard() {}
    select() {}
  }

  it('should return the store with reducer attached', () => {
    const store = cloverleaf.createStore(new DummyBackingStore());
    store.registerReducer(() => {});
    store.should.have.property('reducer');
    store.reducer.should.be.a.Function();
  });
  it('should throw if called more than once', () => {
    const store = cloverleaf.createStore(new DummyBackingStore());
    should.doesNotThrow(() => store.registerReducer(() => {}));
    should.throws(() => store.registerReducer(() => {}));
  });
});
