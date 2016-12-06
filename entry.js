import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './app'
import store from './core/store'

ReactDOM.render((
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
), document.getElementById('app'));
