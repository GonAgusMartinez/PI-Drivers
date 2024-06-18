import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import driverReducer from '../reducer/Index';

const rootReducer = combineReducers({
  driverState: driverReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;