const { BackingStore } = require('./lib/backing-store');
const { createReducer } = require('./lib/create-reducer');
const { createStore } = require('./lib/create-store');

module.exports = {
  BackingStore,
  createReducer,
  createStore,
};
