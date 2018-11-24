const { BackingStore } = require('./lib/backing-store');
const { createReducer } = require('./lib/create-reducer');
module.exports = {
  BackingStore,
  createReducer,
  // createStore,
};
