class StateSnapshot {
  constructor({ store, initialState, currentState = initialState }) {
    this.store = store;
    this.initialState = { ...initialState };
    this.items = { ...currentState };
  }

  async dispatchToStateSnapshot(action) {
    const newItems = await this.store.reducer({ ...this.items }, action);

    return new StateSnapshot({
      store: this.store,
      initialState: { ...this.initialState },
      currentState: newItems,
    });
  }

  commitStateSnapshot() {}

  discardStateSnapshot() {}
}

exports.StateSnapshot = StateSnapshot;
