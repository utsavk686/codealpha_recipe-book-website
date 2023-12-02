import React from 'react'
import "./cardRecipe.css"
import Link from 'next/link'
import Image from 'next/image'

export default function CardRecipe(props) {
    return (
        <div className="mb-10">
            <Link href={`/recipe/${props.data._id}`}>
                <div className="card h-full w-full pb-5">
                    <div className="tools">
                        <div className="circle">
                            <span className="red box"></span>
                        </div>
                        <div className="circle">
                            <span className="yellow box"></span>
                        </div>
                        <div className="circle">
                            <span className="green box"></span>
                        </div>
                    </div>
                    <div className="card__content lg:flex px-10">

                        <div className="lg:w-2/5">
                            <div className="px-4 py-2 bg-gray-300 rounded-lg">
                                <Link href={"/profile/ujjwal21"}>
                                    <div className="flex">
                                        <div className="bg-gray-400 w-10 h-10 rounded-full">
                                            <svg className="h-8 w-8 mx-auto pt-2 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div className="ml-2 w-5/6 mt-0.5 hover:font-bold">
                                            <span className="block font-bold text-base leading-snug text-black">{props.data.cafeUser.username}</span>
                                            <span className="block text-sm text-gray-500 dark:text-gray-600  leading-snug">{props.data.cafeUser.name}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className='mt-2'>
                                <div className="text-2xl overflow-hidden">{props.data.recipeName}</div>
                                <div className='overflow-hidden h-24'>{props.data.description}</div>
                            </div>
                            <div className="flex items-center mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <p className="text-gray-600 font-bold text-sm ml-1">
                                    {((props.data.avgRating / (props.data.reviwe.length * 5)) * 5).toFixed(1)} &nbsp;
                                    <span className="text-gray-500 font-normal">({props.data.reviwe.length} reviews)</span>
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <div className="font-bold me-2">
                                    {props.data.category}
                                </div>
                                <div className={`w-5 h-5 ${(props.data.category === 'veg') ? "border-green-500" : (props.data.category === 'egg') ? "border-yellow-500" : "border-red-500"} border relative`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`w-3 h-3 ${(props.data.category === 'veg') ? "bg-green-500" : (props.data.category === 'egg') ? "bg-yellow-500" : "bg-red-500"} rounded-full`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-3/5 h-72 py-8 lg:py-0 lg:px-4'>
                            <div className="book h-full w-full">
                                <p className="ms-12 me-4 overflow-hidden">{props.data.ingredient}</p>
                                <div className="cover h-full w-full">
                                    <img src={
                                        (props.data.category === "egg") ?
                                            "https://www.tasteofharmony.org.au/wp-content/uploads/2018/02/Sicilian-fried-eggs-scaled.jpg"
                                            :
                                            (props.data.category === "vag") ? "https://img.freepik.com/premium-photo/healthy-food-background-autumn-fresh-vegetables-dark-stone-table-with-copy-space-top-view_127032-1954.jpg"
                                                :
                                                "https://img.freepik.com/premium-photo/food-background-set-dishes-fish-meat-vegetables-black-stone-background-top-view-free-copy-space_187166-16567.jpg"
                                    } alt="food" className='h-full w-full rounded-lg' />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    )
}
