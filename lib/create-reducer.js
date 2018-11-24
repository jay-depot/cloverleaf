function validate(reducerElements) {
  reducerElements.forEach((reducerElement, index) => {
    const isFunction = typeof reducerElement === 'function';
    const isArray = Array.isArray(reducerElement);
    if (!isFunction && !isArray) {
      throw new Error(
        `Expected argument number ${index} of createReducer to be a function or array of functions but found ${typeof reducerFunction}`
      );
    }

    if (isArray) {
      reducerElement.forEach((item, innerIndex) => {
        if (typeof item !== 'function') {
          throw new Error(
            `Expected all elements of array argument number ${index} of createReducer to be array of functions but found ${typeof item} at index ${innerIndex}`
          );
        }
      });
    }
  });
}

exports.createReducer = (...reducerElements) => {
  validate(reducerElements);
  const reducerChain = [].concat.apply([], reducerElements);

  return async (state, action) => {
    return reducerChain.reduce(
      async (currentState, reducerChainStep) =>
        reducerChainStep(await currentState, action),
      Promise.resolve(state)
    );
  };
};
