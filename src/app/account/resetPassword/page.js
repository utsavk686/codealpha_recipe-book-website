"use client"
import React, { useState } from 'react'
import "./resetPage.css"
import Link from 'next/link'
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'

export default function Page() {

    const routes = useRouter()
    const [username, setusername] = useState("")
    const [email, setemail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isOtpSend, setIsOtpSend] = useState(false)


    const changeHandler = (e) => {
        const name = e.target.name
        if (name === "username") {
            setusername(e.target.value)
        } else if (name === "email") {
            setemail(e.target.value)
        } else if (name === "otp") {
            setOtp(e.target.value)
        } else if (name === "password") {
            setPassword(e.target.value)
        }
    }

    const sendOtpHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/auth/resetPassword", {
            method: "POST",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            },
            body: JSON.stringify({
                email: email,
                userName: username
            })
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("Otp send on your email".toUpperCase())
            setIsOtpSend(true)
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/auth/resetPassword", {
            method: "PUT",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            },
            body: JSON.stringify({
                otp: Number.parseInt(otp),
                password: password
            })
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("Password change successfully".toUpperCase())
            routes.push("/account/auth")
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }

    return (
        <div className='container'>
            <center>
                <h1 className='text-4xl mt-5 mx-4 text-white'>Reset Password</h1>
            </center>
            <div>
                <div className='top'></div>
                <div className='bottom'></div>
                <div className='center'>
                    {(isOtpSend) ?
                        <form onSubmit={resetPasswordHandler}>
                            <input onChange={changeHandler} className='auth-input w-72 my-2 p-4 text-black' type="number" placeholder="OTP" name="otp" value={otp} required />
                            <input onChange={changeHandler} className='auth-input w-72 my-2 p-4 text-black' type="text" placeholder="password" name="password" value={password} required />
                            <button type='submit' className='auth-button w-72' disabled={loading}>
                                {
                                    (loading) ?
                                        <center>
                                            <svg className="animate-pulse w-6 h-6 text-gray-900 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 10a28.076 28.076 0 0 1-1.091 9M6.231 2.37a8.994 8.994 0 0 1 12.88 3.73M1.958 13S2 12.577 2 10a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088c.281.706.426 1.46.425 2.22a30 30 0 0 1-.464 6.231M5 10a6 6 0 0 1 9.352-4.974M3 19a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M6.5 17.336C8 15.092 8 12.846 8 10a3 3 0 1 1 6 0c0 .75 0 1.521-.031 2.311M11 10.001c0 3 0 6-2 9" />
                                            </svg>
                                        </center>
                                        :
                                        "Reset Password"
                                }
                            </button>
                            <center className=' text-white'>
                                <p style={{ cursor: "pointer" }} onClick={() => {
                                    setIsOtpSend(false)
                                }} className='font-bold hover:underline'>Resend Otp</p>
                            </center>
                        </form>
                        :
                        <form onSubmit={sendOtpHandler}>
                            <input onChange={changeHandler} name="username" value={username} className='auth-input w-72 my-2 p-4 text-black' type="text" placeholder="User Name" required />
                            <input onChange={changeHandler} name='email' value={email} className='auth-input w-72 my-2 p-4 text-black' type="email" placeholder="email" required />
                            <button type='submit' className='auth-button w-72' disabled={loading}>
                                {
                                    (loading) ?
                                        <center>
                                            <svg className="animate-pulse w-6 h-6 text-gray-900 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                            </svg>
                                        </center>
                                        :
                                        "SEND OTP"
                                }
                            </button>
                            <center className=' text-white'>
                                <Link className='hover:underline' href={"/account/auth"}>login</Link>
                            </center>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
