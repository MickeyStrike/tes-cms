import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootReducers } from '../appRedux/reducer'
import BaseLayout from '../components/baseLayout'
import Chart from '../components/chart'
import Table from '../components/table'
import { Columns, DataChart, DataHistoryTransaction } from '../interfaces/interface'

export default function Dashboard() {

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
      title: 'Date Transaction',
      dataIndex: 'date'
    },
  ])
  const [dataSource, setDataSource] = useState<DataHistoryTransaction[]>([])
  const [dataChart, setDataChart] = useState<DataChart>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'],
    datasets: [{
      label: 'Spent $',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(237, 255, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(237, 255, 64, 1)',
      ],
      borderWidth: 1
    }]
  })

  useEffect(() => {
    if(dataHistoryTransaction) {
      setDataSource(dataHistoryTransaction)
      // set Chart
      const dataDataSets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const tempDataChart:DataChart = { ...dataChart }

      dataHistoryTransaction.forEach((dataForeach) => {
        const index = Number(moment(dataForeach.date, 'DD-MMM-yyyy').format('MM')) - 1
        dataDataSets[index] += dataForeach.total
      })

      tempDataChart.datasets[0].data = dataDataSets
      tempDataChart.datasets[0].data = tempDataChart.datasets[0].data.slice()
      setDataChart({...tempDataChart})
    }
  }, [dataHistoryTransaction])

  return (
    <BaseLayout titlePage='Dashboard'>
      <div className='mx-3 grid gap-x-12 gap-y-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2'>
        <div className='p-6 bg-white rounded-lg border border-gray-200 shadow-md'>
          <p className="font-bold leading-7 text-gray-900 sm:text-xl sm:truncate mb-4">
            Monthly Spent Chart
          </p>
          <Chart dataChartParents={dataChart} />
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:border-gray-200">
          <div className='flex justify-center align-center'>
            <Image src="/reward.png" width="200" height="200" alt='not found image' />
          </div>
          <div className='flex justify-center align-center'>
            <h5 className="mb-2 xs:text-lg sm:text-2xl font-bold tracking-tight text-gray-900">Collect Reward Points to Exchange Gifts</h5>
          </div>
          <div className='flex justify-center align-center'>
            <Image src="/coin.png" width="25" height="20" alt='not found image' />
            <p className="font-normal text-gray-700 dark:text-gray-400">
              1000 Reward Points
            </p>
          </div>
          <div className='mt-2 flex justify-center align-center cursor-pointer'>
            <div className='p-2 bg-yellow-200 hover:bg-yellow-100'>
              Redeem point
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 mx-3 grid gap-x-12 gap-y-10 grid-cols-1 sm:grid-cols-1'>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <p className="font-bold leading-7 text-gray-900 sm:text-xl sm:truncate mb-4">
            History Transaction
          </p>
          {/* TABLE */}
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </BaseLayout>
  )
}
