import { AnyAction, applyMiddleware, CombinedState, compose, createStore, StoreEnhancer } from 'redux'
import reducers from '../reducer/index'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { ActionReducer, InitialState } from '../../interfaces/interface';
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares:ThunkMiddleware[] = [
  thunk
]

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;

// const store = createStore<CombinedState<{reducerRedux: InitialState}> | undefined, ActionReducer, { dispatch: ThunkMiddleware<any, AnyAction, undefined>[]; }, {}>(
//   reducers,
//   composeEnhancers(applyMiddleware<ThunkMiddleware[]>(...middlewares))
// )

const store = createStore<CombinedState<{reducerRedux: InitialState}> | undefined, ActionReducer, { dispatch: ThunkMiddleware<any, AnyAction, undefined>[]; }, {}>(
  reducers,
  composeWithDevTools(applyMiddleware<ThunkMiddleware[]>(...middlewares))
)

export {
  store
};