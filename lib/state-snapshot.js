function recursiveFreeze(object) {
  const properties = Object.getOwnPropertyNames(object);

  properties.forEach(propertyName => {
    const value = object[propertyName];
    object[propertyName] =
      value && typeof value === 'object' ? recursiveFreeze(value) : value;
  });

  return Object.freeze(object);
}

class StateSnapshot {
  constructor({ store, initialState, meta, currentState = initialState }) {
    this.store = store;
    this.initialState = { ...initialState };
    this.items = { ...currentState };
    this.meta = meta;
    this.closed = false;

    recursiveFreeze(this.items);
  }

  _closeSnapshot() {
    if (this.closed) {
      throw new Error('Attempted to dispatch action to closed StateSnapshot');
    }

    this.closed = true;
  }

  _getNextState({ newItems }) {
    return {
      store: this.store,
      initialState: { ...this.initialState },
      currentState: newItems,
      meta: this.meta,
    };
  }

  _getCommitValues() {
    return {
      meta: this.meta,
      items: this.items,
    };
  }

  async dispatchToStateSnapshot(action) {
    this._closeSnapshot();
    const newItems = await this.store.reducer({ ...this.items }, action);

    return new StateSnapshot(this._getNextState({ newItems }));
  }

  async commitStateSnapshot() {
    this._closeSnapshot();
    await this.store.commit(this._getCommitValues());

    return new StateSnapshot({
      ...this._getNextState({}),
      initialState: { ...this.items },
    });
  }

  async discardStateSnapshot() {
    this._closeSnapshot();
    await this.store.discard(this._getCommitValues());

    return new StateSnapshot({
      ...this._getNextState({}),
      currentState: { ...this.initialState },
    });
  }
}

exports.StateSnapshot = StateSnapshot;
