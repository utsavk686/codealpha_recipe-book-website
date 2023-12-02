"use client"
import CardRecipe from '@/components/CardRecipe/CardRecipe'
import LoadingUi from '@/components/LoadingUi/LoadingUi'
import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"

export default function Home() {

  const [getAllData, setGetAllData] = useState('')
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)

  const getData = async()=>{
    setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/recipe", {
            method: "GET",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            }
        })
        const data = await fetchData.json()
        if (data.success) {
            setGetAllData(data.data)
            setUser(data.user)
            console.log(getAllData)
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <div className='py-10 mx-5 md:mx-36'>
      {(loading)?<LoadingUi/>:''}
      {
        (getAllData.length === 0)?"No Recipe Data":
        getAllData.map((element, index)=>{
          return <CardRecipe key={index} data={element}/>
        })
      }
    </div>
  )
}
