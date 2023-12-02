import { NextResponse } from "next/server";
import connectdb from "../../../../connectDB";
import { cookies } from "next/headers";
import { user } from "../../../../model/user";
import { jwtCheck } from "../../../../middleware/jwtFunc";
import { recipe } from "../../../../model/recipe";


export async function GET(req) {
    await connectdb()

    try {

        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login account" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } }).select("+followrs")
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 404 })
        }

        const followrsRecipes = await recipe.find({ cafeUser: { $in: userData.followrs } }).populate("cafeUser")

        const recipes = await recipe.find({ cafeUser: { $nin: userData.followrs } }).populate("cafeUser")

        const recipedata = await followrsRecipes.reverse().concat(recipes.reverse())

        return NextResponse.json({ success: true, data: recipedata, user: { name: userData.name, username: userData.username, id: userData._id } })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}


export async function POST(req){
    await connectdb()

    try {

        const {recipeName, description, ingredient, instruction, category} = await req.json()
        
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login account" }, { status: 400 })
        }

        console.log(recipeName, description, ingredient, instruction, category)

        if(!recipeName || !description || !ingredient || !instruction || !category){
            return NextResponse.json({success: false, message: "fill all field"}, {status: 400})
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } }).select("+myRecipes")
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 404 })
        }

        const recipeData = await recipe.create({
            recipeName, description, ingredient, instruction, category,
            cafeUser: userData._id
        })

        userData.myRecipes.push(recipeData._id)
        await userData.save()

        return NextResponse.json({success: true, data: recipeData})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})
    }
}