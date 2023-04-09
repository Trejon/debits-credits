import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

export default function configureStore(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );
}
