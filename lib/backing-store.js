const SELECT_ITEMS = 'selectItems';
const NEW_ITEMS = 'newItems';
const DISCARD_CHANGES = 'discardChanges';
const COMMIT_CHANGES = 'commitChanges';

function validateRequiredMethod(backingStore, name) {
  const valid = backingStore[name] && typeof backingStore[name] === 'function';

  if (!valid) {
    throw new Error(`BackingStore instance must have ${name} method`);
  }
}

exports.BackingStore = class {
  constructor() {
    [SELECT_ITEMS, NEW_ITEMS, DISCARD_CHANGES, COMMIT_CHANGES].forEach(
      requiredName => validateRequiredMethod(this, requiredName)
    );
  }
};
