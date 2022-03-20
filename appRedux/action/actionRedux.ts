// import { Action } from 'redux'
import Redux, { AnyAction, Action } from 'redux'
// import Redux from 'react-redux'
// import Redux, { ThunkDispatch } from 'redux-thunk'
import { ACTION_TYPE } from '../../interfaces/enum'
import { ActionInterface, ActionReducer, DataCheckout, DataHistoryTransaction, DataNotification } from '../../interfaces/interface';

// type Dispatch<S> = Redux.Dispatch<S extends Redux.Action<any> = Redux.AnyAction>;
// type Dispatch<S> = Redux.Dispatch<A extends Action = AnyAction> {
//   <T extends A>(action: T): T;
// };
// type Dispatch<S> = Redux.Dispatch<S extends Redux.Action<ActionInterface> = Redux.>
interface ActionType<T> {
  type: ACTION_TYPE.SET_DATA_TRANSACTION,
  payload: T
}
// type ActionSet<S> = (payload: S) => ActionType<S>
// interface ActionSet<T> {
//   (payload: T): ActionType<T>
// }

type DispatchType<T> = (arg: T) => void

// export const getAllDataTransaction = () => {
//   return (dispatch:DispatchType<ActionType<[]>>) => {
//     dispatch(setAllDataTransaction([]))
//   }
// }

export const setDataCheckout = (payload:DataCheckout[]) => {
  return {
    type: ACTION_TYPE.SET_DATA_CHECKOUT,
    payload
  }
}

export const setDataNotification = (payload:DataNotification) => {
  return {
    type: ACTION_TYPE.SET_DATA_NOTIFICATION,
    payload
  }
}

export const setAllDataTransaction = (payload:[]) => {
  return {
    type: ACTION_TYPE.SET_DATA_TRANSACTION,
    payload
  }
}

export const setAllDataHistoryTransaction = (payload:DataHistoryTransaction[]) => {
  return {
    type: ACTION_TYPE.SET_DATA_HISTORY_TRANSACTION,
    payload
  }
}

export const setToggleSidebar = (payload:boolean) => {
  return {
    type: ACTION_TYPE.SET_TOGGLE_SIDEBAR,
    payload
  }
}