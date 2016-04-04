require('style.less');

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Actions, store} from 'reducer';
import Application from 'components/Application';
import utils from 'utils';
import Socket from 'socket.io-client';


const io = Socket('/api/io');

io.on('stocks', function(data) {
  store.dispatch(Actions.setupStocks(data));
});


ReactDom.render(
  <Provider store={store}>
    <Application io={io} />
  </Provider>
, document.getElementById('application'));
