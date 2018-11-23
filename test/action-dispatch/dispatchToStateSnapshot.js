describe('stateSnapshot.dispatchToStateSnapshot()', () => {
  it('should call the reducer function registered to the store that created the state snapshot');
  it('should return a new state snapshot matching the output of the reducer');
  it('should not chage the existing state snapshot');

  describe('the function called', () => {
    specify('the first parameter should be a copy of the state snapshot');
    specify('the second parameter should be the first parameter passed to dispatchToStateSnapshot');
  });
});
