const cloverleaf = require('../../index');
const should = require('should');
const sinon = require('sinon');

describe('cloverleaf.createReducer()', () => {
  it('should accept any number of parameters', () => {
    const dummyReducer = (state, action) => state;
    should.doesNotThrow(() => cloverleaf.createReducer([dummyReducer]));

    should.doesNotThrow(() =>
      cloverleaf.createReducer([dummyReducer], dummyReducer)
    );

    should.doesNotThrow(() =>
      cloverleaf.createReducer([dummyReducer], dummyReducer, [dummyReducer])
    );
  });

  it('should throw if any parameter is not a function or an array of functions', () => {
    should.throws(() => cloverleaf.createReducer(true));
    should.throws(() => cloverleaf.createReducer([true]));
  });

  it('should return a function', () => {
    const dummyReducer = (state, action) => state;
    const reducer = cloverleaf.createReducer([dummyReducer]);

    reducer.should.be.a.Function();
  });

  describe('the returned function', () => {
    it('should call the first function passed to cloverleaf.createReducer()', async () => {
      const spy = sinon.spy();
      const reduce = cloverleaf.createReducer([spy]);

      await reduce('test', 'testing');
      spy.should.be.calledWith('test', 'testing');
    });

    it('should call all functions passed to cloverleaf.createReducer() in the order given', async () => {
      const spies = [sinon.stub().returns('test'), sinon.spy()];
      const reduce = cloverleaf.createReducer(spies);

      await reduce('test', 'testing');
      spies.forEach(spy => spy.should.be.calledWith('test', 'testing'));
      spies[0].calledBefore(spies[1]).should.equal(true);
    });

    it('should pass the result of each function into the first parameter of next function', async () => {
      const stub1 = sinon.stub().returns(1);
      const stub2 = sinon.stub().returns(2);
      const stub3 = sinon.stub().returns(3);

      const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

      await reduce(0, 'garbage');
      stub1.should.be.calledWith(0);
      stub2.should.be.calledWith(1);
      stub3.should.be.calledWith(2);
    });

    it('should pass the second parameter into the second parameter of each function', async () => {
      const stub1 = sinon.stub().returns(1);
      const stub2 = sinon.stub().returns(2);
      const stub3 = sinon.stub().returns(3);

      const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

      await reduce(0, 'exactly this action');
      stub1.should.be.calledWith(0, 'exactly this action');
      stub2.should.be.calledWith(1, 'exactly this action');
      stub3.should.be.calledWith(2, 'exactly this action');
    });

    it('should return a promise that resolves to the result of the last function called', () => {
      const stub1 = sinon.stub().returns(1);
      const stub2 = sinon.stub().returns(2);
      const stub3 = sinon.stub().returns(3);

      const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

      return reduce(0, 'something').should.be.fulfilledWith(3);
    });

    context('a function in the chain returns a promise', () => {
      it('should wait for the promise to resolve before calling the next function', async () => {
        const stub1 = sinon.stub().returns(1);
        const stub2 = sinon.stub().callsFake(async () => {
          await Promise.resolve();
          stub3.should.not.be.called();
          return 2;
        });
        const stub3 = sinon.stub().returns(3);

        const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

        return reduce(0, 'something');
      });
    });

    describe('failure conditions', () => {
      context('a function in the chain returns a promise that rejects', () => {
        it('should not call the next function in the chain', async () => {
          const stub1 = sinon.stub().returns(1);
          const stub2 = sinon.stub().rejects();
          const stub3 = sinon.stub().returns(3);

          const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

          await reduce(0, 'something').catch(e => {});

          stub3.should.not.be.called();
        });
        it('should reject with the same error', () => {
          const stub1 = sinon.stub().returns(1);
          const stub2 = sinon.stub().rejects({ name: 'TestError' });
          const stub3 = sinon.stub().returns(3);

          const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

          return reduce(0, 'something').should.be.rejectedWith({
            name: 'TestError',
          });
        });
      });

      context('a function in the chain throws', () => {
        it('should not call the next function in the chain', async () => {
          const stub1 = sinon.stub().returns(1);
          const stub2 = sinon.stub().throws();
          const stub3 = sinon.stub().returns(3);

          const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

          await reduce(0, 'something').catch(e => {});

          stub3.should.not.be.called();
        });
        it('should reject with the same error', () => {
          const stub1 = sinon.stub().returns(1);
          const stub2 = sinon.stub().throws('TestError');
          const stub3 = sinon.stub().returns(3);

          const reduce = cloverleaf.createReducer(stub1, stub2, stub3);

          return reduce(0, 'something').should.be.rejectedWith({
            name: 'TestError',
          });
        });
      });
    });
  });
});
