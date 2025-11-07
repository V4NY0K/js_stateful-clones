'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        history.push(nextState);
        currentState = nextState;
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        history.push(nextState);
        currentState = nextState;
        break;

      default:
        nextState = {};
        history.push({});
        currentState = nextState;
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
