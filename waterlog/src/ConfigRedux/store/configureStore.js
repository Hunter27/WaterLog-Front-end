import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from '../enhancers/monitorReducer';
import loggerMiddleware from '../middleware/logger';
import rootReducer from '../../../src/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)
    const store = createStore(rootReducer, preloadedState, composedEnhancers)
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../../../src/reducers/rootReducer', () => store.replaceReducer(rootReducer))
    }
    return store
}