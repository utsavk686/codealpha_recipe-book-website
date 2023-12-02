"use client"
import React, { useEffect, useState } from 'react'
import "./../profile.css"
import CardRecipe from '@/components/CardRecipe/CardRecipe'
import { toast } from "react-toastify"
import LoadingUi from '@/components/LoadingUi/LoadingUi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page({ params }) {

    const [show, setShow] = useState("myRecipe")
    const [loading, setLoading] = useState(false)
    const [userdata, setUserdata] = useState("")
    const [user, setUser] = useState("")
    const [change, setChange] = useState(false)
    const routes = useRouter()




    const followHandler = async () => {
        setLoading(true)
        const fetchData = await fetch(`http://localhost:3000/api/profile/${params.userName}`, {
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


    const unfollowHandler = async () => {
        setLoading(true)
        const fetchData = await fetch(`http://localhost:3000/api/profile/${params.userName}`, {
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
        const fetchData = await fetch(`http://localhost:3000/api/profile/${params.userName}`, {
            method: "GET",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            }
        })
        const data = await fetchData.json()
        if (data.success) {
            if (!data.user) {
                routes.push("/profile")
                return;
            }
            setUserdata(data.data)
            setUser(data.user)
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
                            <div className="text-center font-normal text-lg">

                            </div>
                            <div className="px-6 text-center mt-2 font-light text-sm">
                                <p>Create account on {userdata.createdAt}</p>
                            </div>
                            <div className="px-6 text-center mt-2 font-light text-sm">
                                {
                                    (userdata.followrs.includes(user.id))?
                                    <button onClick={unfollowHandler} className='w-full mt-4 px-4 py-3 rounded-md text-black font-bold outline-none focus:ring-4 border shadow-lg transform active:scale-75 transition-transform hover:bg-blue-600 hover:text-white'>
                                        Unfollow
                                    </button>
                                    :
                                    <button onClick={followHandler} className='w-full px-4 py-3 rounded-md text-black font-bold outline-none focus:ring-4 shadow-lg border transform active:scale-75 transition-transform hover:bg-blue-600 hover:text-white'>
                                        Follow
                                    </button>
                                }
                            </div>
                            <hr className="mt-4" />
                            <div className="flex p-4">
                                <div className={` w-1/2 text-center`}>
                                    <span className="font-bold">{userdata.followrs.length}</span> Followers
                                </div>
                                <div className="w-0 border border-gray-300">
                                </div>
                                <div className={` w-1/2 text-center`}>
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
                            (show === "favRecipe") ?
                                userdata.favRecipes.map((element, index) => {
                                    return <CardRecipe key={index} data={element}/>
                                })
                                :
                                userdata.myRecipes.map((element, index) => {
                                    return <CardRecipe key={index} data={element}/>
                                })
                        }
                    </div>  
                </div>
    )
}
