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

  getCleanStateSnapshot() {
    return {
      items: {},
      dispatchToStateSnapshot() {},
      commitStateSnapshot() {},
      discardStateSnapshot() {},
    };
  }

  async getStateSnapshotBySelector(selector) {
    if (!selector) {
      throw new Error('getStateSnapshotBySelector requires a selector');
    }
    return {
      items: await this._backingStore.select(selector),
      dispatchToStateSnapshot() {},
      commitStateSnapshot() {},
      discardStateSnapshot() {},
    };
  }
}

exports.createStore = backingStore => {
  if (!backingStore) {
    throw new Error('createStore requires a BackingStore');
  }

  return new Store(backingStore);
};
