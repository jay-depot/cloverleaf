const cloverleaf = require('../../index');
const sinon = require('sinon');

describe('store.getStateSnapshotBySelector()', () => {
  context('when called without a selector', () => {
    it('rejects with an error', () => {
      class DummyBackingStore extends cloverleaf.BackingStore {
        commit() {}
        discard() {}
        select() {}
      }
      const store = cloverleaf.createStore(new DummyBackingStore());

      return store.getStateSnapshotBySelector().should.be.rejected();
    });
  });

  context('when called with a selector', () => {
    it('passes the selector to the backing store', async () => {
      const mockBackingStore = {
        commit() {},
        discard() {},
        select: sinon.stub().resolves({ results: {}, meta: {} }),
      };
      const store = cloverleaf.createStore(mockBackingStore);
      await store.getStateSnapshotBySelector({ test: 'selector' });
      mockBackingStore.select.should.be.calledWith({ test: 'selector' });
    });

    specify(
      'state snapshot object must have property named items',
      async () => {
        const mockBackingStore = {
          commit() {},
          discard() {},
          select: () => ({ results: {}, meta: {} }),
        };
        const store = cloverleaf.createStore(mockBackingStore);
        const selector = await store.getStateSnapshotBySelector({
          test: 'selector',
        });

        selector.should.have.property('items');
      }
    );

    specify('items must match the results from the backing store', async () => {
      const mockBackingStore = {
        commit() {},
        discard() {},
        select: async () => ({
          results: {
            itemType: [
              { id: 1, test: 'selector' },
              { id: 2, test: 'selector' },
              { id: 3, test: 'selector' },
            ],
          },
          meta: {},
        }),
      };
      const store = cloverleaf.createStore(mockBackingStore);
      const selector = await store.getStateSnapshotBySelector({
        test: 'selector',
      });

      selector.items.should.deepEqual({
        itemType: [
          { id: 1, test: 'selector' },
          { id: 2, test: 'selector' },
          { id: 3, test: 'selector' },
        ],
      });
    });

    [
      'dispatchToStateSnapshot',
      'commitStateSnapshot',
      'discardStateSnapshot',
    ].forEach(requiredMethod =>
      specify(
        `resulting object must have method named ${requiredMethod}`,
        async () => {
          const mockBackingStore = {
            commit() {},
            discard() {},
            select: sinon.stub().resolves({
              results: {},
              meta: {},
            }),
          };
          const store = cloverleaf.createStore(mockBackingStore);
          const snapshot = await store.getStateSnapshotBySelector({
            test: 'selector',
          });

          snapshot.should.have.property(requiredMethod);
          snapshot[requiredMethod].should.be.a.Function();
        }
      )
    );
  });
});
