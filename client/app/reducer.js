import {createStore} from 'redux';

class Actions {
  static setupStocks(data) {
    return {
      type : 'SETUP_STOCKS',
      payload : data
    }
  }
}

const InitialState = {
  title : { text : 'Stock Chart App' },
  series : []
};

function reducer(state = InitialState, action) {

  if (action.type === 'SETUP_STOCKS') {
    state.series = action.payload;

    return Object.assign({}, state);
  }

  return state;
}

const store = createStore(reducer);

export {Actions, store};
export default store;
