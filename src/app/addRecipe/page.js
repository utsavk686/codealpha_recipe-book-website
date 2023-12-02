"use client"
import LoadingUi from '@/components/LoadingUi/LoadingUi'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

// veg = https://img.freepik.com/premium-photo/healthy-food-background-autumn-fresh-vegetables-dark-stone-table-with-copy-space-top-view_127032-1954.jpg

// egg = https://images7.alphacoders.com/765/765786.jpg

// non-veg = https://img.freepik.com/premium-photo/food-background-set-dishes-fish-meat-vegetables-black-stone-background-top-view-free-copy-space_187166-16567.jpg

export default function Page() {

  const [recipeName, setrecipeName] = useState("")
  const [description, setdescription] = useState("")
  const [ingredient, setingredient] = useState("")
  const [instruction, setinstruction] = useState("")
  const [category, setcategory] = useState("veg")
  const [loading, setLoading] = useState(false)

  const changeHandler = (e) => {
    const name = e.target.name
    if (name === "recipeName") {
      setrecipeName(e.target.value)
    }
    else if (name === "description") {
      setdescription(e.target.value)
    } else if (name === "ingredient") {
      setingredient(e.target.value)
    } else if (name === "instruction") {
      setinstruction(e.target.value)
    } else if (name === "category") {
      setcategory(e.target.value)
    }
  }

  const clearHandler = (v = false) => {
    setcategory("veg")
    setdescription('')
    setingredient('')
    setinstruction('')
    setrecipeName('')
    toast.info("Form clear".toUpperCase())
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    const fetchData = await fetch("http://localhost:3000/api/recipe", {
      method: "POST",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      body: JSON.stringify({
        recipeName, description, ingredient, instruction, category
      })
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success("Recipe Post successfully".toUpperCase())
      setcategory("veg")
      setdescription('')
      setingredient('')
      setinstruction('')
      setrecipeName('')
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  return (
    <div className="relative flex items-center justify-center bg-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
      style={{
        backgroundImage: `url(${(category === 'veg') ?
          "https://img.freepik.com/premium-photo/healthy-food-background-autumn-fresh-vegetables-dark-stone-table-with-copy-space-top-view_127032-1954.jpg"
          :
          (category === 'egg') ?
            "https://images7.alphacoders.com/765/765786.jpg"
            :
            "https://img.freepik.com/premium-photo/food-background-set-dishes-fish-meat-vegetables-black-stone-background-top-view-free-copy-space_187166-16567.jpg"
          })`
      }}>
      {(loading) ? <LoadingUi /> : ""}
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="max-w-md w-full space-y-8 p-10 text-white rounded-xl border-2 shadow-lg z-10">
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">Add Your Recipe</h2>
              <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
            </div>
            <div className="mt-5">
              <form onSubmit={submitHandler} className="form">
                <div className="w-full">
                  <div className="mb-3 space-y-2 w-full">
                    <label className="font-semibold text-gray-400 py-2">Recipe Name <abbr title="required">*</abbr></label>
                    <input
                      placeholder="Recipe Name "
                      className="appearance-none block w-full text-black border border-grey-lighter rounded-lg h-10 p-4"
                      required
                      value={recipeName}
                      onChange={changeHandler}
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
                      value={description}
                      onChange={changeHandler}
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
                      value={ingredient}
                      onChange={changeHandler}
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
                      value={instruction}
                      onChange={changeHandler}
                      type="text"
                      name="instruction"
                      id="instruction"></textarea>
                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                  </div>
                </div>

                <div className="md:flex md:flex-row md:space-x-4 w-full">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-400 py-2">Category<abbr title="required">*</abbr></label>
                    <select className="block w-full bg-grey-lighter text-black border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required value={category} onChange={changeHandler} name="category" id="category">
                      <option selected className='bg-green-500' value="veg">Veg</option>
                      <option className='bg-yellow-500' value="egg">Egg</option>
                      <option className='bg-red-500' value="non-veg">Non-Veg</option>
                    </select>
                    <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                  </div>
                </div>
                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                  <button onClick={clearHandler} type="reset" className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Clear All </button>
                  <button type='submit' className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
