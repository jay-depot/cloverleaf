const { StateSnapshot } = require('./state-snapshot');

class Store {
  constructor(backingStore) {
    this._backingStore = backingStore;
  }

  registerReducer(reducer) {
    if (this.reducer) {
      throw new Error(
        'Attempted to register reducer to store that already has one'
      );
    }

    this.reducer = reducer;
  }

  async getCleanStateSnapshot() {
    const { meta } = await this._backingStore.newItems();
    return new StateSnapshot({
      store: this,
      initialState: {},
      meta,
    });
  }

  async getStateSnapshotBySelector(selector) {
    if (!selector) {
      throw new Error('getStateSnapshotBySelector requires a selector');
    }
    const { results, meta } = await this._backingStore.selectItems(selector);
    return new StateSnapshot({
      store: this,
      initialState: results,
      meta,
    });
  }

  discard({ meta, items }) {
    return this._backingStore.discardChanges({ meta, items });
  }

  commit({ meta, items }) {
    return this._backingStore.commitChanges({ meta, items });
  }
}

exports.createStore = backingStore => {
  if (!backingStore) {
    throw new Error('createStore requires a BackingStore');
  }

  return new Store(backingStore);
};
