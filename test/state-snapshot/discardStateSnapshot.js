const cloverleaf = require('../../index');
const sinon = require('sinon');

describe('stateSnapshot.discardStateSnapshot', () => {
  it('should call the backing store discard method', async () => {
    const mockBackingStore = {
      discardChanges: sinon.spy(),
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
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

    mockBackingStore.discardChanges.should.be.called();
  });

  it('should return a new state snapshot', async () => {
    const mockBackingStore = {
      discardChanges() {},
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
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
      discardChanges() {},
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
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

  it('should set the closed property on the original state snapshot', async () => {
    const mockBackingStore = {
      discardChanges() {},
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const originalSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    await originalSnapshot.discardStateSnapshot();

    originalSnapshot.should.have.property('closed');
    originalSnapshot.closed.should.equal(true);
  });

  it('should reject if the state snapshot is closed', async () => {
    const mockBackingStore = {
      discardChanges() {},
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const originalSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    originalSnapshot.closed = true;

    return originalSnapshot.discardStateSnapshot().should.be.rejected();
  });

  context('backing store returns a promise that rejects', () => {
    it('should reject with the same error as the backing store', async () => {
      const mockBackingStore = {
        discardChanges: sinon.stub().rejects({ name: 'TestError' }),
        selectItems: () => ({
          results: { itemType: [{ test: 'item' }] },
          meta: {},
        }),
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

      return reducedSnapshot
        .discardStateSnapshot()
        .should.be.rejectedWith({ name: 'TestError' });
    });
  });
});
