"use client"
import LoadingUi from '@/components/LoadingUi/LoadingUi'
import React, { useState } from 'react'
import "./searchBox.css"
import CardRecipe from '@/components/CardRecipe/CardRecipe'
import CardUser from '@/components/CardUser/CardUser'
import { toast } from 'react-toastify'

export default function Page() {

  const [recipeData, setRecipeData] = useState([])
  const [profileData, setProfileData] = useState([])
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState('')

  const onSearchHandler = async (e) => {
    e.preventDefault();
    if (search.length < 3) {
      toast.info("search at least 5 char".toUpperCase())
      return
    }
    setLoading(true)
    const fetchData = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      body: JSON.stringify({
        search: search
      })
    })
    const data = await fetchData.json()
    if (data.success) {
      setRecipeData(data.data.recipe)
      setProfileData(data.data.profile)
      setUser(data.user)
      setShow('')
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  return (
    <div>
      {(loading) ? <LoadingUi /> : ''}
      <center className="mt-6 sticky top-20 z-30">
        <div className="search w-3/5">
          <form onSubmit={onSearchHandler}>
            <input onChange={(e) => {
              setSearch(e.target.value)
            }} value={search} className="w-full" placeholder="Search..." type="text" />
            <button type="submit">Go</button>
          </form>
        </div>
        <center className="mt-4">
          <div className="customCheckBoxHolder w-52">
            <input className="customCheckBoxInput" value='user' type="checkbox" />
            <label className="customCheckBoxWrapper" htmlFor="show">
              <div onClick={() => { setShow("user") }} className="customCheckBox">
                <div className="inner">User</div>
              </div>
            </label>

            <input className="customCheckBoxInput" name="show" type="checkbox" />
            <label className="customCheckBoxWrapper" htmlFor="show">
              <div onClick={() => { setShow("recipe") }} className="customCheckBox">
                <div className="inner">Recipe</div>
              </div>
            </label>

            <input className="customCheckBoxInput" name="show" type="checkbox" />
            <label className="customCheckBoxWrapper" htmlFor="show">
              <div onClick={() => { setShow("") }} className="customCheckBox">
                <div className="inner">Both</div>
              </div>
            </label>

          </div>
        </center>
      </center>
      <div className='py-6 mx-5 md:mx-36'>
        {
          (profileData.length === 0 && recipeData.length === 0) ?
            <p className='text-2xl text-center'>No Search result</p>
            :
            (show === "user") ?
              <div>
                {(profileData.length === 0) ?
                  <p className='text-2xl text-center'>No Search Profile result</p> :
                  profileData.map((element, index) => {
                    return <CardUser key={index} data={element} />
                  })
                }
              </div>
              :
              (show === "recipe") ?
                <div>
                  {(recipeData.length === 0) ?
                    <p className='text-2xl text-center'>No Search Recipe result</p> :
                    recipeData.map((element, index) => {
                      return <CardRecipe key={index} data={element}/>
                    })
                  }
                </div>
                :
                <div>
                  {profileData.map((element, index) => {
                    return <CardUser key={index} data={element} />
                  })}
                  {recipeData.map((element, index) => {
                    return <CardRecipe key={index} data={element} />
                  })}
                </div>
        }
      </div>
    </div>
  )
}
