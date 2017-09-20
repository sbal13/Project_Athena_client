import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import quizReducer from './reducers/quizReducer'
import authReducer from './reducers/authReducer'
import {BrowserRouter as Router} from 'react-router-dom'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'

const rootReducer = combineReducers({auth:authReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
