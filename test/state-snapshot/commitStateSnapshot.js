const cloverleaf = require('../../index');
const sinon = require('sinon');

describe('stateSnapshot.commitStateSnapshot', () => {
  it('should call the backing store commit method', async () => {
    const mockBackingStore = {
      commitChanges: sinon.spy(),
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
    await reducedSnapshot.commitStateSnapshot();

    mockBackingStore.commitChanges.should.be.called();
  });

  context('backing store returns a promise that resolves', () => {
    it('should return a new, immutable, state snapshot', async () => {
      const mockBackingStore = {
        commitChanges() {},
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
      const committedSnapshot = await reducedSnapshot.commitStateSnapshot();

      committedSnapshot.items.should.not.deepEqual(originalSnapshot.items);
    });

    it('should return a state snapshot matching the state as it existed at the time called', async () => {
      const mockBackingStore = {
        commitChanges() {},
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
      const committedSnapshot = await reducedSnapshot.commitStateSnapshot();

      committedSnapshot.items.should.deepEqual(reducedSnapshot.items);
    });
  });

  context('backing store returns a promise that rejects', () => {
    it('should reject with the same error as the backing store', async () => {
      const mockBackingStore = {
        commitChanges: sinon.stub().rejects({ name: 'TestError' }),
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

      // TODO: Check to make sure this is the right error.
      return reducedSnapshot
        .commitStateSnapshot()
        .should.be.rejectedWith({ name: 'TestError' });
    });
  });
});
