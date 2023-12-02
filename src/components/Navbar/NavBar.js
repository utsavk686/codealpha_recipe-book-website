"use client"
import React, { useState } from 'react'
import "./navbar.css"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from "react-toastify"
import LoadingUi from '../LoadingUi/LoadingUi'

export default function NavBar() {

    const [loading, setLoading] = useState(false)
    const path = usePathname()
    const routes = useRouter()

    const logoutHandlet = async () => {
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/auth/logout", {
            method: "GET",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            }
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("Logout successfully".toUpperCase())
            routes.push("/account/auth")
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }


    return (
        (path.startsWith("/account")) ?
            <div></div>
            :
            <nav className="sticky top-0 left-0 right-0 bg-gray-800 shadow shadow-gray-300 w-100 px-4 md:px-8 z-50">
                {(loading)?<LoadingUi/>:""}
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    {/* <!-- Logo --> */}
                    <div className="text-indigo-500 md:order-1">
                        {/* <!-- Heroicon - Chip Outline --> */}
                        <a href={"/"}>
                            <button className="Logo-button" data-text="Awesome">
                                <span className="actual-text">&nbsp;recipe_book&nbsp;</span>
                                <span aria-hidden="true" className="hover-text">&nbsp;recipe_book&nbsp;</span>
                            </button>
                        </a>
                    </div>
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between">
                            {/* <!-- Active Link = text-indigo-500 */}
                            {/* Inactive Link = hover:text-indigo-500 --> */}
                            <li className="md:px-8 md:py-2">
                                <Link href="/">
                                    <svg className={`h-8 w-8 hover:text-indigo-400 ${(path==="/")?"text-indigo-400":"text-gray-500"}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />  <line x1="3" y1="6" x2="3" y2="19" />  <line x1="12" y1="6" x2="12" y2="19" />  <line x1="21" y1="6" x2="21" y2="19" /></svg>
                                </Link></li>
                            <li className="md:px-8 md:py-2">
                                <Link href="/search">
                                    <svg className={`h-8 w-8 hover:text-indigo-400 ${(path==="/search")?"text-indigo-400":"text-gray-500"}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
                                </Link></li>
                            <li className="md:px-8 md:py-2">
                                <Link href="/addRecipe">
                                    <svg className={`h-8 w-8 hover:text-indigo-400 ${(path==="/addRecipe")?"text-indigo-400":"text-gray-500"}`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                </Link></li>
                            <li className="md:px-8 md:py-2">
                                <Link href="/profile">
                                    <svg className={`h-8 w-8 hover:text-indigo-400 ${(path==="/profile")?"text-indigo-400":"text-gray-500"}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                                </Link></li>
                        </ul>
                    </div>
                    <div className="order-2 md:order-3">
                        <button onClick={logoutHandlet} className="logout-button h-10">
                            {/* <!-- Heroicons - Login Solid --> */}
                            <span className="circle1"></span>
                            <span className="circle2"></span>
                            <span className="circle3"></span>
                            <span className="circle4"></span>
                            <span className="circle5"></span>
                            <span className="text flex items-center p-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <p>Login</p>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
    )
}
