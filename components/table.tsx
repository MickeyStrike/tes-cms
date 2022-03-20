import Image from 'next/image'
import React from 'react'
import { Columns } from '../interfaces/interface'

interface PropsTable<T> {
  columns: Columns[],
  dataSource: T[],
  checkBox?: boolean,
  handleAction?: (index: number, data: T, type: string) => void,
  selectedRow?: number[],
  setSelectedRow?: (dataSelected: number[]) => void
}

const Table:React.FC<PropsTable<any>> = ({ columns, dataSource, checkBox, handleAction, selectedRow, setSelectedRow }) => {

  const handleSelectedRow = (index: number) => {
    if(selectedRow && setSelectedRow) {
      let tempSelectedRow = selectedRow.slice()
      if(selectedRow.includes(index)) {
        tempSelectedRow = tempSelectedRow.filter((dataFilter) => dataFilter !== index)
      } else {
        tempSelectedRow.push(index)
      }
      setSelectedRow(tempSelectedRow)
    }
  }

  const handleClickOption = (index:number, data:any, type: string) => {
    if(handleAction) {
      handleAction(index, data, type)
    }
  }

  const generateRowTdNotFound = () => {
    let generatedRow:React.ReactNode[] = []
    for (let i = 0; i < Math.ceil(columns.length / 2); i++) {
      generatedRow.push(
        <>
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">{' '}</td>
        </>
      )
    }
    return generatedRow
  }

  const generateRow = () => {
    const tempTr:React.ReactNode[] = []
    dataSource.forEach((itemDataSource, indexDataSource) => {
      const tempTd:React.ReactNode[] = []
      columns.forEach((itemColumns, index) => {
        if(index === 0 && checkBox) {
          tempTd.push(<>
            <td className="p-4">
              <div className="flex items-center">
                <input id="checkbox-table-1" type="checkbox" onClick={() => handleSelectedRow(indexDataSource)} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
              </div>
            </td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
              {
                itemDataSource[itemColumns.dataIndex] ? itemDataSource[itemColumns.dataIndex] : ''
              }
            </td>
          </>)
        }
        else if(itemColumns.dataIndex === 'action') {
          tempTd.push(<>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
              { 
                itemColumns.action?.map((actionMap, indexItemColumns) => {
                  return (
                    <>
                      <a key={indexItemColumns} className="text-blue-600 mr-1 dark:text-blue-500 hover:underline cursor-pointer" onClick={() => handleClickOption(indexDataSource, itemDataSource, actionMap)}>{actionMap}</a>
                    </>
                  )
                })
              }
            </td>
          </>)
        }
        else if (itemColumns.dataIndex === 'imageUrl') {
          tempTd.push(<>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
              <img className="w-10 h-10" src={itemDataSource.imageUrl} alt="product image" />
            </td>
          </>)
        }
        else {
          tempTd.push(<>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
              {
                itemDataSource[itemColumns.dataIndex] ? itemDataSource[itemColumns.dataIndex] : ''
              }
            </td>
          </>)
        }
      })
      tempTr.push(<>
        <tr className="hover:bg-gray-100 dark:hover:bg-gray-100">
          {tempTd}
        </tr>
      </>)
    })

    return tempTr
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-100 table-fixed dark:divide-gray-100">
              <thead className="bg-gray-100 dark:bg-gray-100">
                <tr>
                  {
                    checkBox ?
                    <>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          {/* <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600" /> */}
                          {/* <label className="sr-only">checkbox</label> */}
                        </div>
                      </th>
                    </>
                    :
                    null
                  }
                  {
                    columns && columns.length > 0 && columns.map((dataMap, index) => {
                      return (
                        <th key={index} scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-800">
                          {dataMap.title}
                        </th>
                      )
                    })
                  }
                  {/* <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-800">
                    Product Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-800">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-800">
                    Price
                  </th>
                  <th scope="col" className="p-4">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              {/* <tr>
                <Image src="/undraw_no_data_re_kwbl.svg" width="200" height="200" alt='not found image' />
                <p className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">No Data</p>
              </tr> */}
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-200">
                {
                  columns && dataSource.length > 0 ? 
                    generateRow()
                  :
                    <tr style={{ display: 'revert' }} className="w-full" aria-colspan={columns.length}>
                      {
                        generateRowTdNotFound()
                      }
                      <td className='flex justify-center items-center flex-col col-span-6'>
                        <Image src="/undraw_no_data_re_kwbl.svg" width="200" height="200" alt='not found image' />
                        <p className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">No Data</p>
                      </td>
                    </tr>
                }
                {/* <tr className="hover:bg-gray-100 dark:hover:bg-gray-100">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">Apple Imac 27"</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-gray-900">Desktop PC</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">$1999</td>
                  <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                    <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-100">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">Apple MacBook Pro 17"</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-gray-900">Laptop</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">$2999</td>
                  <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                    <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table