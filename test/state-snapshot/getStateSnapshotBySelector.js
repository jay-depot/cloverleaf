describe('store.createStateSnapshotBySelector()', () => {
  context('called with undefined as a selector', () => {
    it('throws an exception');
  });

  context('called with empty object as a selector', () => {
    it('passes the selector to the backing store');
    specify('state snapshot object must have property named items');
    specify('items must match the results from the backing store');
    specify(
      'state snapshot object must have method named dispatchToStateSnapshot'
    );
    specify('state snapshot object must have method named commitStateSnapshot');
    specify(
      'state snapshot object must have method named discardStateSnapshot'
    );
  });

  context('called with non-empty object as a selector', () => {
    it('passes the selector to the backing store');
    specify('state snapshot object must have property named items');
    specify('items must match the results from the backing store');
    specify(
      'state snapshot object must have method named dispatchToStateSnapshot'
    );
    specify('state snapshot object must have method named commitStateSnapshot');
    specify(
      'state snapshot object must have method named discardStateSnapshot'
    );
  });
});
