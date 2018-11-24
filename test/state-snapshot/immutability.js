const cloverleaf = require('../../index');
const should = require('should');

describe('StateSnapshot immutability', () => {
  let snapshot;

  before(async () => {
    const mockBackingStore = {
      commitChanges() {},
      selectItems: () => ({
        results: { itemType: [{ test: 'item' }] },
        meta: {},
      }),
    };
    const store = cloverleaf.createStore(mockBackingStore);

    snapshot = await store.getStateSnapshotBySelector({
      test: 'selector',
    });
  });

  it('should not allow direct changes to existing data in the internal items state', () => {
    snapshot.items.itemType[0].test = 'changed';
    snapshot.items.itemType[0].test.should.not.equal('changed');
    snapshot.items.itemType[0].test.should.equal('item');
  });

  it('should not allow direct addition of new properties to the internal items state', () => {
    should.throws(() => snapshot.items.itemType.push({ shouldNot: 'exist' }));
    snapshot.items.itemType.length.should.equal(1);
  });

  it('should not allow direct changes to existing data in the internal initialState', () => {
    snapshot.initialState.itemType[0].test = 'changed';
    snapshot.initialState.itemType[0].test.should.not.equal('changed');
    snapshot.initialState.itemType[0].test.should.equal('item');
  });

  it('should not allow direct addition of new properties to the internal initialState', () => {
    should.throws(() =>
      snapshot.initialState.itemType.push({ shouldNot: 'exist' })
    );
    snapshot.initialState.itemType.length.should.equal(1);
  });
});
