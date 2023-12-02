"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import LoadingUi from '@/components/LoadingUi/LoadingUi'
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'

export default function Page() {

    const routes = useRouter()
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const [signData, setSignData] = useState({
        username: "",
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const loginChangeHandler = (e) => {
        const kname = e.target.name
        if (kname === "username") {
            setLoginData({ ...loginData, username: e.target.value })
        } else if (kname === "password") {
            setLoginData({ ...loginData, password: e.target.value })
        }
    }

    const signChangeHandler = (e) => {
        const kname = e.target.name
        if (kname === "username") {
            setSignData({ ...signData, username: e.target.value })
        } else if (kname === "name") {
            setSignData({ ...signData, name: e.target.value })
        } else if (kname === "email") {
            setSignData({ ...signData, email: e.target.value })
        } else if (kname === "password") {
            setSignData({ ...signData, password: e.target.value })
        }
    }

    const loginSubmitHandlet = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            },
            body: JSON.stringify({
                username: loginData.username,
                password: loginData.password
            })
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("Login successfully".toUpperCase())
            routes.push("/")
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }

    const signupSubmitHandlet = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            },
            body: JSON.stringify({
                name: signData.name,
                username: signData.username,
                email: signData.email,
                password: signData.password
            })
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("Account create successfully".toUpperCase())
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }


    return (
        <div className="main">
            <input className='auth-input' type="checkbox" id="chk" aria-hidden="true" />

            <div className="login">
                <form onSubmit={loginSubmitHandlet}>
                    <label className='auth-label' htmlFor="chk" aria-hidden="true">Login</label>
                    <input className='auth-input p-4 text-black' type="text" name="username" onChange={loginChangeHandler} value={loginData.username} placeholder="User Name" required />
                    <input className='auth-input p-4 text-black' type="password" name="password" onChange={loginChangeHandler} value={loginData.password} placeholder="Password" required />
                    <p className='text-center mx-8'>
                        <Link href={'/account/resetPassword'} className='hover:underline'>forget password</Link>
                    </p>
                    <button disabled={loading} type='submit' className='auth-button w-3/5'>
                        {
                            (loading) ?
                                <center>
                                    <svg class="animate-pulse w-6 h-6 text-gray-900 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.079 4.839a3 3 0 0 0-4.255.1M11 18h1.083A3.916 3.916 0 0 0 16 14.083V7A6 6 0 1 0 4 7v7m7 4v-1a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4V8H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1V8Z" />
                                    </svg>
                                </center>
                                :
                                "Login"
                        }
                    </button>
                </form>
            </div>

            <div className="signup">
                <form onSubmit={signupSubmitHandlet}>
                    <label className='auth-label' htmlFor="chk" aria-hidden="true">Signup</label>
                    <input className='auth-input p-4 text-black' type="text" name="username" onChange={signChangeHandler} value={signData.username} placeholder="User name" required />
                    <input className='auth-input p-4 text-black' type="text" name="name" onChange={signChangeHandler} value={signData.name} placeholder="Name" required />
                    <input className='auth-input p-4 text-black' type="email" name="email" onChange={signChangeHandler} value={signData.email} placeholder="Email" required />
                    <input className='auth-input p-4 text-black' type="password" name="password" onChange={signChangeHandler} value={signData.password} placeholder="Password" required />
                    <button disabled={loading} type='submit' className='auth-button w-3/5'>
                        {
                            (loading) ?
                                <center>
                                    <svg className="animate-pulse w-6 h-6 text-gray-900 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                    </svg>
                                </center>
                                :
                                "Sign up"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
