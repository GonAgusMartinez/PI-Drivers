import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import driversReducer from '../Reducer/Index';

const rootReducer = combineReducers({
  drivers: driversReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;