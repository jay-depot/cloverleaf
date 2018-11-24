const cloverleaf = require('../../index');
const should = require('should');

describe('cloverleaf.BackingStore', () => {
  it('should throw if constructed directly', () => {
    should.throws(() => new cloverleaf.BackingStore());
  });

  context('when extended by another class', () => {
    describe('constructor', () => {
      it('should throw if selectItems method is not defined by child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          commitChanges() {}
          discardChanges() {}
          newItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message === 'BackingStore instance must have selectItems method'
          );
        });
      });

      it('should throw if property selectItems is not a function in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          constructor() {
            super();
            this.selectItems = true;
          }
          commitChanges() {}
          discardChanges() {}
          newItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message === 'BackingStore instance must have selectItems method'
          );
        });
      });

      it('should throw if commitChanges method is not defined by child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          discardChanges() {}
          newItems() {}
          selectItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message ===
            'BackingStore instance must have commitChanges method'
          );
        });
      });

      it('should throw if property commitChanges is not a function in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          constructor() {
            super();
            this.commitChanges = true;
          }
          discardChanges() {}
          newItems() {}
          selectItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message ===
            'BackingStore instance must have commitChanges method'
          );
        });
      });

      it('should throw if discardChanges method is not defined by child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          commitChanges() {}
          newItems() {}
          selectItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message ===
            'BackingStore instance must have discardChanges method'
          );
        });
      });

      it('should throw if property discard is not a function in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          constructor() {
            super();
            this.discardChanges = true;
          }
          commitChanges() {}
          newItems() {}
          selectItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message ===
            'BackingStore instance must have discardChanges method'
          );
        });
      });

      it('should throw if newItems method is not defined by child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          commitChanges() {}
          discardChanges() {}
          selectItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message === 'BackingStore instance must have newItems method'
          );
        });
      });

      it('should throw if property newItems is not a function in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          constructor() {
            super();
            this.newItems = true;
          }
          commitChanges() {}
          discardChanges() {}
          selectItems() {}
        }
        should.throws(() => new DummyBackingStore(), function(err) {
          return (
            err.message === 'BackingStore instance must have newItems method'
          );
        });
      });

      it('should succeed if all required methods are defined in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          commitChanges() {}
          discardChanges() {}
          newItems() {}
          selectItems() {}
        }

        const backingStore = new DummyBackingStore();

        backingStore.commitChanges.should.be.a.Function();
        backingStore.discardChanges.should.be.a.Function();
        backingStore.newItems.should.be.a.Function();
        backingStore.selectItems.should.be.a.Function();
      });
    });
  });
});
