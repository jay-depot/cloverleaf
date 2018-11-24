const cloverleaf = require('../../index');
const should = require('should');

describe('cloverleaf.BackingStore', () => {
  it('should throw if constructed directly', () => {
    should.throws(() => new cloverleaf.BackingStore());
  });

  context('when extended by another class', () => {
    describe('constructor', () => {
      it('should throw if select method is not defined by child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          commit() {}
          discard() {}
        }
        should.throws(() => new DummyBackingStore());
      });

      it('should throw if property select is not a function in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          constructor() {
            super();
            this.select = true;
          }
          commit() {}
          discard() {}
        }
        should.throws(() => new DummyBackingStore());
      });

      it('should throw if commit method is not defined by child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          discard() {}
          select() {}
        }
        should.throws(() => new DummyBackingStore());
      });

      it('should throw if property commit is not a function in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          constructor() {
            super();
            this.commit = true;
          }
          discard() {}
          select() {}
        }
        should.throws(() => new DummyBackingStore());
      });

      it('should throw if discard method is not defined by child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          commit() {}
          select() {}
        }
        should.throws(() => new DummyBackingStore());
      });

      it('should throw if property discard is not a function in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          constructor() {
            super();
            this.discard = true;
          }
          commit() {}
          select() {}
        }
        should.throws(() => new DummyBackingStore());
      });

      it('should succeed if all required methods are defined in child class', () => {
        class DummyBackingStore extends cloverleaf.BackingStore {
          commit() {}
          discard() {}
          select() {}
        }

        const backingStore = new DummyBackingStore();

        backingStore.commit.should.be.a.Function();
        backingStore.discard.should.be.a.Function();
        backingStore.select.should.be.a.Function();
      });
    });
  });
});
