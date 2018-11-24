describe('stateSnapshot.commitStateSnapshot', () => {
  it('should call the backing store commit method');

  context('backing store returns a promise that resolves', () => {
    it('should return a new, immutable, state snapshot');

    it(
      'should return a state snapshot matching the state as it existed at the time called'
    );
  });

  context('backing store returns a promise that rejects', () => {
    it('should reject with the same error as the backing store');
  });
});
