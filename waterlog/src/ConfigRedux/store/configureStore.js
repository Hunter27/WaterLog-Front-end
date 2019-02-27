import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from '../enhancers/monitorReducer';
import loggerMiddleware from '../middleware/logger';
import rootReducer from '../../../src/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import signalRMiddleware from '../middleware/signalRMiddleware';
import { reduxPollingMiddleware } from 'redux-polling';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(preloadedState) {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [loggerMiddleware, thunkMiddleware, signalRMiddleware, reduxPollingMiddleware,sagaMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)
    const store = createStore(rootReducer, preloadedState, composedEnhancers)
  
    return store
}