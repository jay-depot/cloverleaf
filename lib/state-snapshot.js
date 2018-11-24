class StateSnapshot {
  constructor({ store, initialState, meta, currentState = initialState }) {
    this.store = store;
    this.initialState = { ...initialState };
    this.items = { ...currentState };
    this.meta = meta;
  }

  async dispatchToStateSnapshot(action) {
    const newItems = await this.store.reducer({ ...this.items }, action);

    return new StateSnapshot({
      store: this.store,
      initialState: { ...this.initialState },
      currentState: newItems,
      meta: this.meta,
    });
  }

  async commitStateSnapshot() {
    await this.store.commit({
      meta: this.meta,
      items: this.items,
    });

    return new StateSnapshot({
      store: this.store,
      initialState: { ...this.items },
      meta: this.meta,
    });
  }

  async discardStateSnapshot() {
    await this.store.discard({
      meta: this.meta,
      items: this.items,
    });

    return new StateSnapshot({
      store: this.store,
      initialState: { ...this.initialState },
      meta: this.meta,
    });
  }
}

exports.StateSnapshot = StateSnapshot;
