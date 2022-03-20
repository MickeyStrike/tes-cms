import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootReducers } from '../appRedux/reducer'

interface ListMenu {
  title: string,
  url: string,
  svgPath: React.ReactNode
}

const listMenu:ListMenu[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    svgPath: (<>
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
    </>)
  },
  {
    title: 'Marketplace',
    url: '/market',
    svgPath: (<>
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
      </path>
    </>)
  },
  {
    title: 'Checkout',
    url: '/checkout',
    svgPath: (<>
      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
      </path>
      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
      </path>
    </>)
  },
]

export default function Sidebar() {
  const toggleSidebar = useSelector((state:RootReducers) => state?.reducerRedux.toggleSidebar)
  return (
    <aside className="w-64 fixed z-10" aria-label="Sidebar">
      <div className={toggleSidebar ? "overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800 min-h-screen" : "hidden overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800 min-h-screen"}>
        <div className="m-3 mb-10">
          <img
            className="block lg:hidden h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow"
          />
          <img
            className="hidden lg:block h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
          />
        </div>
        <ul className="space-y-2">
          {
            listMenu.map((dataMap, index) => (
              <li key={index}>
                <Link href={dataMap.url}>
                  <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      {dataMap.svgPath}
                    </svg>
                    <span className="ml-3">{dataMap.title}</span>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </aside>
  )
}
