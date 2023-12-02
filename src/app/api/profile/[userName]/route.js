import { NextResponse } from "next/server";
import connectdb from "../../../../../connectDB";
import { cookies } from "next/headers";
import { jwtCheck } from "../../../../../middleware/jwtFunc";
import { user } from "../../../../../model/user";
import { recipe } from "../../../../../model/recipe";


export async function GET(req, { params }) {
    await connectdb()

    try {

        const { userName } = await params

        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } }).select("+email +favRecipes +myRecipes +followrs +following").populate(["followrs", "following", "myRecipes", "favRecipes"])

        if (!userData) {
            return NextResponse.json({ success: false, message: "user id not found for some error re-login" }, { status: 400 })
        }

        if (userData.username === userName) {
            return NextResponse.json({ success: true, data: userData })
        }

        const findUser = await user.findOne({ username: { $eq: userName } }).select("+favRecipes +myRecipes +followrs +following")

        if (!findUser) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 404 })
        }

        const myRecipes = await recipe.find({_id: {$in: findUser.myRecipes}}).populate("cafeUser")
        const favRecipes = await recipe.find({_id: {$in: findUser.favRecipes}}).populate("cafeUser")

        findUser.myRecipes = myRecipes
        findUser.favRecipes = favRecipes

        return NextResponse.json({ success: true, data: findUser, user: { username: userData.username, id: userData._id } })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    await connectdb()

    try {

        const { userName } = await params

        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } }).select("+following")

        if (!userData) {
            return NextResponse.json({ success: false, message: "user id not found for some error re-login" }, { status: 400 })
        }

        if (userData.username === userName) {
            return NextResponse.json({ success: false, message: "you con't  follow yourself" }, {status: 400})
        }

        const findUser = await user.findOne({ username: { $eq: userName } }).select("+followrs")

        if (!findUser) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 404 })
        }

        const isFollow = userData.following.includes(findUser._id)
        if(isFollow){
            return NextResponse.json({ success: false, message: "already follow" })
        }

        userData.following.push(findUser._id)
        findUser.followrs.push(userData._id)

        await userData.save()
        await findUser.save()

        return NextResponse.json({ success: true, message: "follow successfully" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}

export async function DELETE(req, {params}){
    await connectdb()

    try {

        const { userName } = await params

        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } }).select("+following")

        if (!userData) {
            return NextResponse.json({ success: false, message: "user id not found for some error re-login" }, { status: 400 })
        }

        if (userData.username === userName) {
            return NextResponse.json({ success: false, message: "you con't unfollow yourself" }, {status: 400})
        }

        const findUser = await user.findOne({ username: { $eq: userName } }).select("+followrs")

        if (!findUser) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 404 })
        }

        const isFollow = userData.following.includes(findUser._id)
        if(!isFollow){
            return NextResponse.json({ success: false, message: "you can't follow this user"})
        }

        await userData.following.splice(await userData.following.indexOf(findUser._id), 1)
        await findUser.followrs.splice(await findUser.followrs.indexOf(userData._id), 1)

        await userData.save()
        await findUser.save()

        return NextResponse.json({ success: true, message: "unfollow successfully" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}