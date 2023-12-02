"use client"
import React, { useEffect, useState } from 'react'
import "./profile.css"
import CardRecipe from '@/components/CardRecipe/CardRecipe'
import { toast } from "react-toastify"
import LoadingUi from '@/components/LoadingUi/LoadingUi'
import Link from 'next/link'

export default function Page() {

    const [show, setShow] = useState("myRecipe")
    const [loading, setLoading] = useState(false)
    const [userdata, setUserdata] = useState("")
    const [change, setChange] = useState(false)



    const followHandler = async (username) => {
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
            setChange(!change)
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
            toast.success("unfollow successfully".toUpperCase())
            setChange(!change)
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }


    const onFetchData = async () => {
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/profile", {
            method: "GET",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            }
        })
        const data = await fetchData.json()
        if (data.success) {
            setUserdata(data.data)
            console.log(data.data)
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }



    useEffect(() => {
        onFetchData()
    }, [change])


    return (

        (loading) ?
            <LoadingUi />
            :
            (!userdata) ?
                <div className='mt-36 h-90 text-center text-4xl text-gray-300 font-mono'>Data not fetch becouse <span className='text-gray-400'>Internal server error</span></div>
                :
                <div className="">
                    <div className="mt-10 font-sans flex flex-row justify-center items-center">
                        <div className="card w-96 mx-auto bg-white shadow-2xl rounded-2xl hover:rounded">
                            <div className="text-center mt-2 text-3xl font-medium">{userdata.name}</div>
                            <div className="text-center mt-2 font-bold text-sm">@{userdata.username}</div>
                            <div className="text-center font-normal text-lg">{userdata.email}</div>
                            <div className="px-6 text-center mt-2 font-light text-sm">
                                <p>Create account on {userdata.createdAt}</p>
                            </div>
                            <hr className="mt-4" />
                            <div className="flex p-4">
                                <div onClick={() => { setShow("follower") }} className={`cursor-pointer w-1/2 text-center ${(show === "follower") ? "text-lg font-bold" : ''}`}>
                                    <span className="font-bold">{userdata.followrs.length}</span> Followers
                                </div>
                                <div className="w-0 border border-gray-300">
                                </div>
                                <div onClick={() => { setShow("following") }} className={`cursor-pointer w-1/2 text-center ${(show === "following") ? "text-lg font-bold" : ''}`}>
                                    <span className="font-bold">{userdata.following.length}</span> Following
                                </div>
                            </div>
                        </div>
                    </div>
                    <center className="mt-4">
                        <div className="radio-inputs">
                            <label onClick={() => { setShow("myRecipe") }} className="radio">
                                <input readOnly type="radio" name="radio" checked={(show === "myRecipe") ? true : false} />
                                <span className="name">{`My Recipe (${userdata.myRecipes.length})`}</span>
                            </label>

                            <label onClick={() => { setShow("favRecipe") }} className="radio">
                                <input readOnly type="radio" name="radio" checked={(show === "favRecipe") ? true : false} />
                                <span className="name">{`Fav Recipe (${userdata.favRecipes.length})`}</span>
                            </label>
                        </div>
                    </center>
                    <div className='py-6 mx-5 md:mx-36'>
                        {
                            (show === "following" || show === "follower") ?
                                <div className="h-screen flex justify-center px-3 overscroll-contain">
                                    <div className="relative w-full max-w-lg">
                                        <div className="relative space-y-4">
                                            {
                                                (show === "following") ?
                                                    userdata.following.map((element, index) => {
                                                        return (
                                                            <div key={index} className="p-3 w-full bg-white rounded-lg flex items-center justify-between space-x-8">
                                                                <div className="flex-1 flex justify-between items-center">
                                                                    <div className="px-4 w-48 rounded">
                                                                        <Link href={`/profile/${element.username}`}>
                                                                            <p className="text-lg font-bold">{element.username}</p>
                                                                            <p className="text-sm">{element.name}</p>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="px-4">

                                                                        <button onClick={() => { unfollowHandler(element.username, index) }} className='w-24 px-4 py-3 bg-blue-300 rounded-md text-black font-bold outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform hover:bg-blue-600 hover:text-white disable:bg-blue-300' >
                                                                            Unfollow
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })

                                                    :

                                                    userdata.followrs.map((element, index) => {
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
                                                                        <button onClick={() => { followHandler(element.username, index) }} className='w-24 px-4 py-3 bg-blue-300 rounded-md text-black font-bold outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform hover:bg-blue-600 hover:text-white disable:bg-blue-300'>
                                                                            Follow
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })


                                            }
                                        </div>
                                    </div>
                                </div>
                                : ""
                        }
                        {(show === "favRecipe" || show === "myRecipe" || !show) ?
                            (show === "favRecipe") ?
                                userdata.favRecipes.map((element, index) => {
                                    return <CardRecipe key={index} data={element} />
                                })
                                :
                                userdata.myRecipes.map((element, index) => {
                                    return <CardRecipe key={index} data={element}/>
                                })
                            : ""
                        }
                    </div>
                </div>
    )
}
