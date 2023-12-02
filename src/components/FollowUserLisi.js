"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from "react-toastify"

export default function FollowUserLisi(props) {

    console.log(props.type, props.list)

    const [list, setList] = useState(props.list)
    const [loading, setLoading] = useState(false)

    const followHandler = async (username, index) => {
        setLoading(true)
        const fetchData = await fetch(`http://localhost:3000/api/profile/${username}`, {
            method: "PUT",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            }
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("follow successfully".toUpperCase())
            props.setChange(!props.change)
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }

    const unfollowHandler = async (username, index) => {
        setLoading(true)
        const fetchData = await fetch(`http://localhost:3000/api/profile/${username}`, {
            method: "DELETE",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            }
        })
        const data = await fetchData.json()
        if (data.success) {
            setList(list.splice(index, 1))
            toast.success("unfollow successfully".toUpperCase())
            props.setChange(!props.change)
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }

    return (
        <div className="h-screen flex justify-center px-16 overscroll-contain">
            <div className="relative w-full max-w-lg">
                <div className="m-8 relative space-y-4">
                    {
                        list.map((element, index) => {
                            return (
                                <div key={index} className="p-3 bg-white rounded-lg flex items-center justify-between space-x-8">
                                    <div className="flex-1 flex justify-between items-center">
                                        <div className="px-4 w-48 rounded">
                                            <Link href={`/profile/${element.username}`}>
                                                <p className="text-lg font-bold">{element.username}</p>
                                                <p className="text-sm">{element.name}</p>
                                            </Link>
                                        </div>
                                        <div className="px-4">
                                            {
                                                (props.type === "following") ?
                                                    <button onClick={() => { unfollowHandler(element.username, index) }} className='w-24 px-4 py-3 bg-blue-300 rounded-md text-black font-bold outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform hover:bg-blue-600 hover:text-white disable:bg-blue-300' disabled={loading}>
                                                        {
                                                            (loading) ?
                                                                <center>
                                                                    <svg className="animate-spin h-6 w-6 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />  <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" strokeDasharray=".001 4.13" /></svg>
                                                                </center>
                                                                :
                                                                "Unfollow"
                                                        }
                                                    </button>

                                                    :
                                                    (props.type === "follower") ?
                                                        <button onClick={() => {followHandler(element.username, index) }} className='w-24 px-4 py-3 bg-blue-300 rounded-md text-black font-bold outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform hover:bg-blue-600 hover:text-white disable:bg-blue-300' disabled={loading}>
                                                            {
                                                                (loading) ?
                                                                    <center>
                                                                        <svg className="animate-spin h-6 w-6 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />  <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" strokeDasharray=".001 4.13" /></svg>
                                                                    </center>
                                                                    :
                                                                    "Follow"
                                                            }
                                                        </button>
                                                        :
                                                        ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
