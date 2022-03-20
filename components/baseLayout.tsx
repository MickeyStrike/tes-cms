import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDataNotification } from '../appRedux/action/actionRedux'
import { RootReducers } from '../appRedux/reducer'
import { DataNotification } from '../interfaces/interface'
import BreadCrumb from './breadCrumb'
import Chart from './chart'
import Header from './header'
import Notification from './notification'
import Sidebar from './sidebar'

interface Props {
  children?: React.ReactNode,
  titlePage: string
}

const BaseLayout:React.FC<Props> = ({ children, titlePage }) => {

  const dispatch = useDispatch()
  const dataNotification = useSelector((state:RootReducers) => state?.reducerRedux.dataNotification)
  const toggleSidebar = useSelector((state:RootReducers) => state?.reducerRedux.toggleSidebar)

  useEffect(() => {
    if(dataNotification?.visible) {
      const newData:DataNotification = { ...dataNotification, visible: false }
      setTimeout(() => {
        dispatch(setDataNotification(newData))
      }, 1000);
    }
  }, [dataNotification])

  return (
    <>
      <Sidebar />
      <div className={toggleSidebar ? 'sm:ml-0 lg:ml-64' : 'ml-0'}>
        <Header/>
        <nav className="flex py-3 px-5 text-gray-700" aria-label="Breadcrumb">
          {/* BREADCRUMB */}
          <BreadCrumb />
        </nav>
        {/* TITLE */}
        <div className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white'>
          <h2 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{titlePage}</h2>
        </div>
        {/* CONTENT */}
        {children}
      </div>
      {
        dataNotification?.visible ?
          <Notification />
        :
          null
      }
    </>
  )
}

export default BaseLayout
