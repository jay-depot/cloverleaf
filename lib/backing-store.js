exports.BackingStore = class {
  constructor() {
    if (!this.select || typeof this.select !== 'function') {
      throw new Error('BackingStore instance must have select method');
    }

    if (!this.commit || typeof this.commit !== 'function') {
      throw new Error('BackingStore instance must have commit method');
    }

    if (!this.discard || typeof this.discard !== 'function') {
      throw new Error('BackingStore instance must have commit method');
    }
  }
};
