import { ACTION_TYPE } from '../../interfaces/enum'
import { ActionReducer, InitialState, ReducerRedux } from '../../interfaces/interface'

const initialState:InitialState = {
  dataTransaction: [],
  loading: false,
  toggleSidebar: true,
  dataCheckout: [
    {
      productName: 'Apple Earpod',
      imageUrl: 'https://images.tokopedia.net/img/cache/700/product-1/2017/4/7/2226820/2226820_7efa43d4-8bba-4188-b083-51b9c3c7dc86_800_800.jpg.webp?ect=4g',
      price: 10,
      qty: 2,
      total: 20,
    },
  ],
  dataNotification: {
    message: 'Success add to cart',
    status: 'success',
    visible: false
  },
  dataHistoryTransaction: [
    {
      productName: 'Apple Earpod',
      imageUrl: 'https://images.tokopedia.net/img/cache/700/product-1/2017/4/7/2226820/2226820_7efa43d4-8bba-4188-b083-51b9c3c7dc86_800_800.jpg.webp?ect=4g',
      price: 10,
      qty: 4,
      total: 40,
      date: '11-Jan-2022'
    },
    {
      productName: 'Apple Earpod',
      imageUrl: 'https://images.tokopedia.net/img/cache/700/product-1/2017/4/7/2226820/2226820_7efa43d4-8bba-4188-b083-51b9c3c7dc86_800_800.jpg.webp?ect=4g',
      price: 10,
      qty: 1,
      total: 10,
      date: '28-Feb-2022'
    },
    {
      productName: 'Apple Earpod',
      imageUrl: 'https://images.tokopedia.net/img/cache/700/product-1/2017/4/7/2226820/2226820_7efa43d4-8bba-4188-b083-51b9c3c7dc86_800_800.jpg.webp?ect=4g',
      price: 10,
      qty: 2,
      total: 20,
      date: '20-Mar-2022'
    },
  ]
}

const reducerRedux:ReducerRedux = (state: InitialState | undefined, action:ActionReducer):InitialState => {
  const newState = state || initialState
  switch(action.type) {
    case ACTION_TYPE.SET_DATA_TRANSACTION:
      return { ...newState, dataTransaction: action.payload }
    case ACTION_TYPE.SET_DATA_CHECKOUT:
      return { ...newState, dataCheckout: action.payload }
    case ACTION_TYPE.SET_DATA_NOTIFICATION:
      return { ...newState, dataNotification: action.payload }
    case ACTION_TYPE.SET_DATA_HISTORY_TRANSACTION:
      return { ...newState, dataHistoryTransaction: action.payload }
    case ACTION_TYPE.SET_TOGGLE_SIDEBAR:
      return { ...newState, toggleSidebar: action.payload }
    default:
      return newState
  }
}

export default reducerRedux