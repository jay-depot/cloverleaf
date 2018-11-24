exports.BackingStore = class {
  constructor() {
    const selectItemsMethodValid =
      this.selectItems && typeof this.selectItems === 'function';
    const newItemsMethodValid =
      this.newItems && typeof this.newItems === 'function';
    const commitChangesMethodValid =
      this.commitChanges && typeof this.commitChanges === 'function';
    const discardChangesMethodValid =
      this.discardChanges && typeof this.discardChanges === 'function';

    if (!selectItemsMethodValid) {
      throw new Error('BackingStore instance must have selectItems method');
    }

    if (!newItemsMethodValid) {
      throw new Error('BackingStore instance must have newItems method');
    }

    if (!commitChangesMethodValid) {
      throw new Error('BackingStore instance must have commitChanges method');
    }

    if (!discardChangesMethodValid) {
      throw new Error('BackingStore instance must have discardChanges method');
    }
  }
};
