import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from '../enhancers/monitorReducer';
import rootReducer from '../../../src/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import loggerMiddleware from '../middleware/logger';

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)
    const store = createStore(rootReducer, preloadedState, composedEnhancers)
  
    return store
}
