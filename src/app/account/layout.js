import React from 'react'
import "./auth.css"

export default function layout({children}) {
  return (
    <div className='authContainer'>
      {children}
    </div>
  )
}
