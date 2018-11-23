describe('stateSnapshot.discardStateSnapshot', () => {
  it('should call the backing store discard method');
  it('should not call any other backing store methods');
  it('should return a new, immutable, state snapshot');
  it('should return a state snapshot matching the original state as it existed before any actions were dispatched');
});
