import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDataNotification } from '../appRedux/action/actionRedux'
import { RootReducers } from '../appRedux/reducer'
import BaseLayout from '../components/baseLayout'
import CardCommerce from '../components/cardCommerce'
import notification from '../components/notification'
import { DataNotification, ListCardCommerce } from '../interfaces/interface'

export default function Market() {
  const dispatch = useDispatch()
  const [listCard] = useState<ListCardCommerce[]>([
    {
      title: 'Apple Macbook Pro M1 512 GB/13"/8GB',
      price: 1499,
      imageUrl: 'https://images.tokopedia.net/img/cache/700/hDjmkQ/2021/8/24/72c66947-afee-45a0-8f9b-d3ac6c785267.jpg.webp?ect=4g'
    },
    {
      title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
      price: 599,
      imageUrl: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2022/2/11/bb6fb920-fcfb-4b8d-a2c7-fc1fcf6af7b3.jpg.webp?ect=4g'
    },
    {
      title: 'Apple iPhone 13 Pro 128 256 512 1TB',
      price: 1499,
      imageUrl: 'https://images.tokopedia.net/img/cache/700/hDjmkQ/2021/11/19/d7e2a6b0-d724-413a-92a8-3c2b61474c6b.jpg.webp?ect=4g'
    },
    {
      title: 'Apple Earpod',
      price: 10,
      imageUrl: 'https://images.tokopedia.net/img/cache/700/product-1/2017/4/7/2226820/2226820_7efa43d4-8bba-4188-b083-51b9c3c7dc86_800_800.jpg.webp?ect=4g'
    },
  ])
  
  return (
    <BaseLayout titlePage='Marketplace'>
      <div className='p-6 mx-3 grid gap-x-12 gap-y-10 grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {
          listCard.map((dataMap) => (
            <CardCommerce key={dataMap.title} title={dataMap.title} price={dataMap.price} imageUrl={dataMap.imageUrl} />
          ))
        }
      </div>
    </BaseLayout>
  )
}
