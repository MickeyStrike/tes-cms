import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { setAllDataHistoryTransaction, setDataCheckout, setDataNotification } from '../appRedux/action/actionRedux'
import { RootReducers } from '../appRedux/reducer'
import BaseLayout from '../components/baseLayout'
import Table from '../components/table'
import { Columns, DataCheckout, DataHistoryTransaction, DataProduct } from '../interfaces/interface'

const Checkout:React.FC = () => {

  const dispatch = useDispatch()
  const dataCheckout = useSelector((state:RootReducers) => state?.reducerRedux.dataCheckout)
  const dataHistoryTransaction = useSelector((state:RootReducers) => state?.reducerRedux.dataHistoryTransaction)

  const [columns] = useState<Columns[]>([
    {
      title: 'Product Name',
      dataIndex: 'productName'
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl'
    },
    {
      title: 'Price ($)',
      dataIndex: 'price'
    },
    {
      title: 'Quantity',
      dataIndex: 'qty'
    },
    {
      title: 'Total ($)',
      dataIndex: 'total'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      action: ['edit', 'delete']
    },
  ])
  const [dataTable, setDataTable] = useState<DataCheckout | null>(null)
  const [indexTable, setIndexTable] = useState<number>(0)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>('')

  const [dataSource, setDataSource] = useState<DataCheckout[]>([])
  const [selectedRow, setSelectedRow] = useState<number[]>([])

  useEffect(() => {
    if(dataCheckout) {
      setDataSource(dataCheckout)
    }
  }, [dataCheckout])

  const handleActionModal = (index:number, data:DataCheckout, type: string) => {
    console.log(index, 'index')
    setTypeModal(type.toLocaleLowerCase())
    setDataTable(data)
    setIndexTable(index)
    setVisibleModal(true)
  }

  const handleCancel = () => {
    setVisibleModal(false)
  }

  const handleSave = () => {
    if(typeModal.toLocaleLowerCase() === 'edit' && dataCheckout && dataTable) {
      let tempDataCheckout = dataCheckout.slice()
      tempDataCheckout[indexTable] = dataTable
      tempDataCheckout = tempDataCheckout.slice()
      dispatch(setDataCheckout(tempDataCheckout))
    } else if (typeModal.toLocaleLowerCase() === 'delete' && dataCheckout) {
      let tempDataCheckout = dataCheckout.filter((dataFilter, index) => index !== indexTable)
      dispatch(setDataCheckout(tempDataCheckout))
    }
    setVisibleModal(false)
  }

  const handleChangeQuantity = (value: string) => {
    if(dataTable) {
      const tempDataTable = {
        ...dataTable,
        qty: Number(value),
        total: dataTable.price * Number(value)
      }
      setDataTable(tempDataTable)
    }
  }

  const handleCheckout = () => {
    if(selectedRow.length < 1) {
      dispatch(setDataNotification({
        message: 'Select data first to checkout',
        status: 'error',
        visible: true
      }))
    } else if (selectedRow.length > 0 && dataCheckout && dataHistoryTransaction) {
      const tempDataHistoryTransaction:DataHistoryTransaction[] = dataCheckout.filter((value, index) => selectedRow.includes(index)).map((dataMap) => {
        return { ...dataMap, date: moment().format('DD-MMM-yyyy') }
      }).concat(dataHistoryTransaction)
      const tempDataCheckout = dataCheckout.filter((value, index) => !selectedRow.includes(index))
      dispatch(setAllDataHistoryTransaction(tempDataHistoryTransaction))
      dispatch(setDataCheckout(tempDataCheckout))
      dispatch(setDataNotification({
        message: 'Success checkout items',
        status: 'success',
        visible: true
      }))
    }
  }

  return (
    <BaseLayout titlePage='Checkout'>
      <div className='mt-5 mx-3 grid gap-x-12 gap-y-10 grid-cols-1 sm:grid-cols-1'>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <p className="font-bold leading-7 text-gray-900 sm:text-xl sm:truncate mb-4">
            List Checkout
          </p>
          {/* TABLE */}
          <Table columns={columns} dataSource={dataSource} checkBox={true} handleAction={handleActionModal} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
          <div className='flex justify-end'>
            <button data-modal-toggle="defaultModal" type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleCheckout()}>Checkout</button>
          </div>
        </div>
      </div>
      {/* Modal Edit */}
      <div id="defaultModal" className={visibleModal ? "grid bg-gray-900 bg-opacity-70 overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center h-modal md:h-full md:inset-0" : "hidden"}>
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                {typeModal === 'edit' ? 'Edit Item' : 'Delete Item'}
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-200 dark:hover:text-gray-900" data-modal-toggle="defaultModal" onClick={() => handleCancel()}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
              </button>
            </div>
            <div className="p-10">
              {
                typeModal === 'edit' ?
                  <div className="relative z-0 mb-6 w-full group">
                    <input type="number" value={dataTable ? dataTable.qty : 0} onChange={(event) => handleChangeQuantity(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Input Qty" />
                    <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Qty</label>
                  </div>
                :
                  <p className="text-base leading-relaxed text-gray-500">
                    Are you sure want to delete this items ?
                  </p>
              }
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 justify-end">
              <button data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-red-600 hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:text-white dark:border-gray-500 dark:hover:text-white dark:hover:bg-red-700" onClick={() => handleCancel()}>Cancel</button>
              <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleSave()}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Checkout