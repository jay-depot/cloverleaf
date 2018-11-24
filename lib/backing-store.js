exports.BackingStore = class {
  constructor() {
    if (!this.selectItems || typeof this.selectItems !== 'function') {
      throw new Error('BackingStore instance must have selectItems method');
    }

    if (!this.newItems || typeof this.newItems !== 'function') {
      throw new Error('BackingStore instance must have newItems method');
    }

    if (!this.commitChanges || typeof this.commitChanges !== 'function') {
      throw new Error('BackingStore instance must have commitChanges method');
    }

    if (!this.discardChanges || typeof this.discardChanges !== 'function') {
      throw new Error('BackingStore instance must have discardChanges method');
    }
  }
};
