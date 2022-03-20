import { ACTION_TYPE } from "../enum";

export interface ActionReducer {
  type: ACTION_TYPE,
  payload: any
}

export interface InitialState {
  dataTransaction: [],
  loading: boolean,
  toggleSidebar: boolean,
  dataCheckout: DataCheckout[]
  dataNotification: DataNotification,
  dataHistoryTransaction: DataHistoryTransaction[]
}

export interface ReducerRedux {
  (state: InitialState | undefined, action: ActionReducer): InitialState
}

export interface ActionInterface {
  // (payload: any): { type: ACTION_TYPE.SET_DATA_TRANSACTION, payload: any }
  (payload: any): ActionReducer
}

export interface ListCardCommerce {
  title: string,
  price: number,
  imageUrl: string
}

export interface Columns {
  title: string,
  dataIndex: string,
  action?: string[]
}

export interface DataProduct {
  productName: string,
  imageUrl: string,
  price: number,
  qty: number,
}

export interface DataCheckout {
  productName: string,
  imageUrl: string,
  price: number,
  qty: number,
  total: number,
}

export interface DataNotification {
  message: string,
  status: 'success' | 'error',
  visible: boolean
}

export interface DataHistoryTransaction {
  productName: string
  imageUrl: string,
  price: number,
  qty: number,
  total: number,
  date: string
}

export interface DataChart {
  labels: string[],
  datasets: DataSets[]
}

export interface DataSets {
  label: string,
  data: number[],
  backgroundColor: string[],
  borderColor: string[],
  borderWidth: number
}