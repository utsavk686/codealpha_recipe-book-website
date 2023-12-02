import { NextResponse } from "next/server";
import connectdb from "../../../../../connectDB";
import { cookies } from "next/headers";
import { jwtCheck } from "../../../../../middleware/jwtFunc";
import { user } from "../../../../../model/user";
import { recipe } from "../../../../../model/recipe";


export async function GET(req, { params }) {
    await connectdb()

    try {

        const { recipeId } = await params
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } })
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 })
        }

        const recipeData = await recipe.findOne({ _id: { $eq: recipeId } }).populate(["cafeUser", "reviwe.user"])
        if (!recipeData) {
            return NextResponse.json({ success: false, message: "recipe not found" }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: recipeData, user: { id: userData._id, username: userData.username } })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}


export async function POST(req, { params }) {
    await connectdb()

    try {

        const { message, rating } = await req.json()

        const { recipeId } = await params
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        if (!rating || (rating < 1) || (rating > 5)) {
            return NextResponse.json({ success: false, message: "rating is mast be 1 to 5" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } })
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 })
        }

        const recipeData = await recipe.findOne({ _id: { $eq: recipeId } })
        if (!recipeData) {
            return NextResponse.json({ success: false, message: "recipe not found" }, { status: 400 })
        }

        recipeData.reviwe.push({
            user: userData._id,
            message: message,
            rating: Number.parseInt(rating)
        })

        recipeData.avgRating = recipeData.avgRating + rating

        await recipeData.save()

        return NextResponse.json({ success: true, message: "reviwe added", data: recipeData })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    await connectdb()

    try {

        const { recipeName, description, ingredient, instruction, category } = await req.json()

        const { recipeId } = await params
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        if (!recipeName && !description && !ingredient && !instruction && !category) {
            return NextResponse.json({ success: false, message: "fill update data" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } })
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 })
        }

        const recipeData = await recipe.findOne({ _id: { $eq: recipeId } })
        if (!recipeData) {
            return NextResponse.json({ success: false, message: "recipe not found" }, { status: 400 })
        }

        if (recipeData.cafeUser.toString() !== userData._id.toString()) {
            return NextResponse.json({ success: false, message: "you can not update other user recipe" }, { status: 400 })
        }

        if (recipeName) {
            recipeData.recipeName = recipeName
        }
        if (description) {
            recipeData.description = description
        }
        if (ingredient) {
            recipeData.ingredient = ingredient
        }
        if (instruction) {
            recipeData.instruction = instruction
        }
        if (category) {
            recipeData.category = category
        }

        await recipeData.save()


        return NextResponse.json({ success: true, message: "recipe updated", data: recipeData })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    await connectdb()

    try {

        const { recipeId } = await params
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } }).select("+myRecipes")
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 })
        }

        const recipeData = await recipe.findOne({ _id: { $eq: recipeId } })
        if (!recipeData) {
            return NextResponse.json({ success: false, message: "recipe not found" }, { status: 400 })
        }

        if (recipeData.cafeUser.toString() !== userData._id.toString()) {
            return NextResponse.json({ success: false, message: "you can not delete other user recipe" }, { status: 400 })
        }

        const deleteData = await recipe.findOneAndDelete({ _id: { $eq: recipeData._id } })

        await userData.myRecipes.splice(await userData.myRecipes.indexOf(recipeData._id), 1)

        await userData.save()

        return NextResponse.json({ success: true, message: "recipe updated", data: deleteData })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    await connectdb()

    try {

        const { recipeId } = await params
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } }).select("+favRecipes")
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 })
        }

        const recipeData = await recipe.findOne({ _id: { $eq: recipeId } })
        if (!recipeData) {
            return NextResponse.json({ success: false, message: "recipe not found" }, { status: 400 })
        }

        if(userData.favRecipes.includes(recipeData._id)){
            return NextResponse.json({ success: true, message: "Recipe already add"}, {status: 400})
        }

        await userData.favRecipes.push(recipeData._id)

        await userData.save()

        return NextResponse.json({ success: true, message: "favourite recipe added"})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}

