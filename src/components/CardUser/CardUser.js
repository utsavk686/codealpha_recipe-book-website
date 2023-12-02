import React from 'react'
import "./cardUser.css"
import Link from 'next/link'

export default function CardUser(props) {

    return (
        <center className="mb-10">
            <div className='w-96'>
                <Link href={`/profile/${props.data.username}`}>
                    <div className="cardUser w-full">
                        <div className="imgUser py-2">
                            <svg className="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                        </div>
                        <div className="textBoxUser">
                            <div className="textContentUser">
                                <p className="ps-3 h1User text-lg">{props.data.username}</p>
                            </div>
                            <p className="ps-4 text-left text-md pUser">{props.data.name}</p>
                            <div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </center >
    )
}
