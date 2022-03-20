import { Reducer } from 'react'
import { CombinedState, combineReducers } from 'redux'
import { ActionReducer, InitialState, ReducerRedux } from '../../interfaces/interface'
import reducerRedux from './reducerRedux'

const reducers:Reducer<CombinedState<{reducerRedux: InitialState}> | undefined, ActionReducer> = combineReducers<{reducerRedux:ReducerRedux}>({
  reducerRedux
})

export type RootReducers = ReturnType<typeof reducers>

export default reducers