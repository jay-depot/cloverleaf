class Store {
  constructor(backingStore) {
    this._backingStore = backingStore;
  }

  registerReducer() {}
  getCleanStateSnapshot() {}
  getStateSnapshotBySelector() {}
}

exports.createStore = backingStore => {
  if (!backingStore) {
    throw new Error('createStore requires a BackingStore');
  }

  return new Store(backingStore);
};
