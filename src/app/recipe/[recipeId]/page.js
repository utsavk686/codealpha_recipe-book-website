"use client"
import CardUser from '@/components/CardUser/CardUser'
import LoadingUi from '@/components/LoadingUi/LoadingUi'
import RatingCard from '@/components/RatingCard/RatingCard'
import RatingForm from '@/components/RatingForm/RatingForm'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Page({ params }) {

  const router = useRouter()
  const [fetchData, setFetchData] = useState("")
  const [user, setUser] = useState("")
  const [isCafe, setIsCafe] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useState(false)
  const [isUpdateData, setIsUpdateData] = useState({
    recipeName: "",
    category: "",
    instruction: "",
    ingredient: "",
    description: ""
  })


  const getFetchData = async () => {
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/recipe/${params.recipeId}`, {
      method: "GET",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      setFetchData(data.data)
      setUser(data.user)
      setIsUpdateData({
        recipeName: data.data.recipeName,
        category: data.data.category,
        instruction: data.data.instruction,
        ingredient: data.data.ingredient,
        description: data.data.description
      })
      if (data.data.cafeUser._id === data.user.id) {
        setIsCafe(true)
      }
      console.log(data)
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  useEffect(() => {
    getFetchData()
  }, [change])


  const onDeleteHandler = async () => {
    const con = confirm("Confirm for recipe delete")
    if (!con) {
      return
    }
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/recipe/${params.recipeId}`, {
      method: "DELETE",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success("Recipe deleted".toUpperCase())
      router.push("/")
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  const onFavHandler = async () => {
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/recipe/${params.recipeId}`, {
      method: "PATCH",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message.toUpperCase())
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/recipe/${params.recipeId}`, {
      method: "PUT",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      body: JSON.stringify({
        recipeName: isUpdateData.recipeName,
        category: isUpdateData.category,
        instruction: isUpdateData.instruction,
        ingredient: isUpdateData.ingredient,
        description: isUpdateData.description
      })
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success("Recipe Updated".toUpperCase())
      setIsUpdate(!isUpdate)
      setChange(!change)
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }


  const ratingComponent = () => {
    const star = Array.from({ length: Math.round(((fetchData.avgRating / (fetchData.reviwe.length * 5)) * 5)) }, (_, index) => (
      <svg key={`s-${index}`} className="w-6 h-6 text-yellow-800 dark:text-white hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    ))
    const unStar = Array.from({ length: (5 - Math.round(((fetchData.avgRating / (fetchData.reviwe.length * 5)) * 5))) }, (_, index) => (
      <svg key={`u-${index}`} className="w-6 h-6 text-yellow-800 dark:text-white hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z" />
      </svg>
    ))
    return star.concat(unStar)
  }

  return (
    (!fetchData) ?
      (loading) ? <LoadingUi /> :
        <div className='h-30 p-24 w-full'>
          <p className='text-center text-3xl font-bold text-gray-300'>This recipe can not found in server</p>
        </div>
      :
      <div className='w-full '>
        {(loading) ? <LoadingUi /> : ""}
        <div className='sticky top-32 md:top-20 z-30'>
          <CardUser data={{ username: fetchData.cafeUser.username, name: fetchData.cafeUser.name }} />
        </div>
        <div className='md:flex w-full md:h-[500px]'>
          <div className='bg-black w-full md:w-2/5 h-[300px] md:h-full'
            style={{
              backgroundImage: `url(${(fetchData.category === 'veg') ?
                "https://img.freepik.com/premium-photo/healthy-food-background-autumn-fresh-vegetables-dark-stone-table-with-copy-space-top-view_127032-1954.jpg"
                :
                (fetchData.category === 'egg') ?
                  "https://images7.alphacoders.com/765/765786.jpg"
                  :
                  "https://img.freepik.com/premium-photo/food-background-set-dishes-fish-meat-vegetables-black-stone-background-top-view-free-copy-space_187166-16567.jpg"
                })`
            }}
          >
          </div>
          {
            (isUpdate) ?
              <form onSubmit={onSubmitHandler} className='p-4 bg-white w-full md:w-3/5 md:h-full md:overflow-y-auto'>
                <div className="w-full">
                  <div className="mb-3 space-y-2 w-full">
                    <label className="font-semibold text-gray-400 py-2">Recipe Name <abbr title="required">*</abbr></label>
                    <input
                      placeholder="Recipe Name "
                      className="appearance-none block w-full text-black border border-grey-lighter rounded-lg h-10 p-4"
                      required
                      value={isUpdateData.recipeName}
                      onChange={(e) => {
                        setIsUpdateData({
                          ...isUpdateData,
                          recipeName: e.target.value
                        })
                      }}
                      type="text"
                      name="recipeName"
                      id="recipeName" />
                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                  </div>
                  <div className="mb-3 space-y-2 w-full">
                    <label className="font-semibold text-gray-400 py-2">Description <abbr title="required">*</abbr></label>
                    <textarea
                      placeholder="Description"
                      className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded-lg p-4"
                      rows="3"
                      required
                      value={isUpdateData.description}
                      onChange={(e) => {
                        setIsUpdateData({
                          ...isUpdateData,
                          description: e.target.value
                        })
                      }}
                      type="text"
                      name="description"
                      id="description"></textarea>
                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                  </div>
                  <div className="mb-3 space-y-2 w-full">
                    <label className="font-semibold text-gray-400 py-2">Ingredient <abbr title="required">*</abbr></label>
                    <textarea
                      placeholder="Ingredient"
                      className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded-lg p-4"
                      rows="3"
                      required
                      value={isUpdateData.ingredient}
                      onChange={(e) => {
                        setIsUpdateData({
                          ...isUpdateData,
                          ingredient: e.target.value
                        })
                      }}
                      type="text"
                      name="ingredient"
                      id="ingredient"></textarea>
                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                  </div>
                  <div className="mb-3 space-y-2 w-full">
                    <label className="font-semibold text-gray-400 py-2">Instruction <abbr title="required">*</abbr></label>
                    <textarea
                      placeholder="Instruction"
                      className="appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded-lg p-4"
                      rows="3"
                      required
                      value={isUpdateData.instruction}
                      onChange={(e) => {
                        setIsUpdateData({
                          ...isUpdateData,
                          instruction: e.target.value
                        })
                      }}
                      type="text"
                      name="instruction"
                      id="instruction"></textarea>
                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                  </div>
                </div>

                <div className="md:flex md:flex-row md:space-x-4 w-full">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-400 py-2">Category<abbr title="required">*</abbr></label>
                    <select className="block w-full bg-grey-lighter text-black border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required value={isUpdateData.category}
                      onChange={(e) => {
                        setIsUpdateData({
                          ...isUpdateData,
                          category: e.target.value
                        })
                      }} name="category" id="category">
                      <option selected className='bg-green-500' value="veg">Veg</option>
                      <option className='bg-yellow-500' value="egg">Egg</option>
                      <option className='bg-red-500' value="non-veg">Non-Veg</option>
                    </select>
                    <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                  </div>
                </div>
                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                  <button type='submit' className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Update</button>
                </div>
              </form>
              :
              <div className='p-4 bg-white w-full md:w-3/5 md:h-full md:overflow-y-auto'>
                <div className='flex justify-between'>
                  <div className='text-center text-3xl font-bold'>{fetchData.recipeName}</div>
                  <div>
                    <svg onClick={onFavHandler} className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="font-bold me-2">
                    {fetchData.category}
                  </div>
                  <div className={`w-5 h-5 ${(fetchData.category === 'veg') ? "border-green-500" : (fetchData.category === 'egg') ? "border-yellow-500" : "border-red-500"} border relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-3 h-3 ${(fetchData.category === 'veg') ? "bg-green-500" : (fetchData.category === 'egg') ? "bg-yellow-500" : "bg-red-500"} rounded-full`}></div>
                    </div>
                  </div>
                </div>
                <p className='pt-2 whitespace-break-spaces'>{fetchData.description}</p>
                <p className='mt-4 text-xl font-bold'>Ingrediant</p>
                <p className='whitespace-break-spaces'>{fetchData.ingredient}</p>
                <p className='mt-4 text-lg font-bold'>Instruction</p>
                <p className='whitespace-break-spaces'>{fetchData.instruction}</p>
              </div>
          }
        </div>
        <center className='my-8'>
          {
            (isCafe) ?
              <div className='flex w-1/2 justify-between'>
                <button onClick={onDeleteHandler} className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>DELETE Recipe</button>
                <button onClick={() => {
                  setIsUpdate(!isUpdate)
                }} className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold ${(isUpdate) ? "bg-blue-500" : ""} hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>{(isUpdate) ? "Not Update" : "UPDATE Recipe"}</button>
              </div> : ""
          }
          <div className='h-1 w-4/5 mt-2 bg-black rounded-full'></div>
        </center>
        <div className='my-8'>
          <p className='text-2xl font-bold text-center md:tracking-widest'>Recipe Reviwe
          </p>
          <center>
            <div className='h-2 bg-white border-2 w-3/5 rounded-lg'></div>
            <div className='mt-4'>
              <p className='font-bold text-lg'>Totel Rating: &nbsp;{((fetchData.avgRating / (fetchData.reviwe.length * 5)) * 5).toFixed(1)} &nbsp;
              </p>
              <div className='w-24 flex'>
                {
                  ratingComponent()
                }
              </div>
              <p className='font-bold text-sm text-gray-300'>({fetchData.reviwe.length} Reviwe)</p>
            </div>
          </center>
          <RatingForm change={change} setChange={setChange} setLoading={setLoading} recipeId={fetchData._id} />
        </div>
        <div className='my-10'>
          {
            fetchData.reviwe.map((element, index) => {
              return <RatingCard key={index} data={element} recipeId={fetchData._id} user={user} isCafe={isCafe} change={change} setChange={setChange} setLoading={setLoading} />
            })
          }
        </div>
      </div>
  )
}
