const cloverleaf = require('../../index');
const sinon = require('sinon');

describe('stateSnapshot.discardStateSnapshot', () => {
  it('should call the backing store discard method', async () => {
    const mockBackingStore = {
      commit() {},
      discard: sinon.spy(),
      select: () => ({ results: { itemType: [{ test: 'item' }] }, meta: {} }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const originalSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    const reducedSnapshot = await originalSnapshot.dispatchToStateSnapshot({
      reducer: 'reduced',
    });
    await reducedSnapshot.discardStateSnapshot();

    mockBackingStore.discard.should.be.called();
  });

  it('should return a new state snapshot', async () => {
    const mockBackingStore = {
      commit() {},
      discard: sinon.spy(),
      select: () => ({ results: { itemType: [{ test: 'item' }] }, meta: {} }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const originalSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    const reducedSnapshot = await originalSnapshot.dispatchToStateSnapshot({
      reducer: 'reduced',
    });
    const revertedSnapshot = await reducedSnapshot.discardStateSnapshot();

    revertedSnapshot.items.should.not.deepEqual(reducedSnapshot.items);
  });

  it('should return a state snapshot matching the original state', async () => {
    const mockBackingStore = {
      commit() {},
      discard: sinon.spy(),
      select: () => ({ results: { itemType: [{ test: 'item' }] }, meta: {} }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const originalSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    const reducedSnapshot = await originalSnapshot.dispatchToStateSnapshot({
      reducer: 'reduced',
    });
    const revertedSnapshot = await reducedSnapshot.discardStateSnapshot();

    revertedSnapshot.items.should.deepEqual(originalSnapshot.items);
  });
});
