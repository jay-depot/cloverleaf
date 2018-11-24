const cloverleaf = require('../../index');
const sinon = require('sinon');

describe('stateSnapshot.dispatchToStateSnapshot()', () => {
  it('should call the reducer function registered to the store that created the state snapshot', async () => {
    const mockBackingStore = {
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = sinon.spy();
    store.registerReducer(fakeReducer);
    const snapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    await snapshot.dispatchToStateSnapshot({ test: 'action' });

    fakeReducer.should.be.calledWith(
      { itemType: [{ test: 'item' }] },
      { test: 'action' }
    );
  });

  it('should return a new state snapshot matching the output of the reducer', async () => {
    const mockBackingStore = {
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const snapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    const newSnapshot = await snapshot.dispatchToStateSnapshot({
      reducer: 'reduced',
    });

    newSnapshot.items.should.deepEqual({ reducer: 'reduced' });
  });

  it('should not chage the existing state snapshot', async () => {
    const mockBackingStore = {
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const oldSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    await oldSnapshot.dispatchToStateSnapshot({
      reducer: 'reduced',
    });

    oldSnapshot.items.should.deepEqual({ itemType: [{ test: 'item' }] });
  });

  it('should set the closed property on the existing state snapshot', async () => {
    const mockBackingStore = {
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const oldSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    await oldSnapshot.dispatchToStateSnapshot({
      reducer: 'reduced',
    });

    oldSnapshot.should.have.property('closed');
    oldSnapshot.closed.should.equal(true);
  });

  it('should reject if the state snapshot is closed', async () => {
    const mockBackingStore = {
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);
    const fakeReducer = (state, action) => action;
    store.registerReducer(cloverleaf.createReducer(fakeReducer));
    const oldSnapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
    oldSnapshot.closed = true;

    return oldSnapshot
      .dispatchToStateSnapshot({
        reducer: 'reduced',
      })
      .should.be.rejected();
  });
});
