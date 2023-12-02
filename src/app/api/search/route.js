import { NextResponse } from "next/server";
import connectdb from "../../../../connectDB";
import { cookies } from "next/headers";
import { jwtCheck } from "../../../../middleware/jwtFunc";
import { user } from "../../../../model/user";
import { recipe } from "../../../../model/recipe";


export async function POST(req){
    await connectdb()
    try {

        const {search} = await req.json()
        
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if(!jwt){
            return NextResponse.json({success: false, message: "please login"}, {status:400})
        }

        if(!search){
            return NextResponse.json({success: false, message: "please enter data"}, {status:400})
        }
        if(search.length < 3){
            return NextResponse.json({success: false, message: "please enter min 5 character"}, {status:400})
        }

        const userData = await user.findOne({_id: {$eq: jwt._id}})
        if(!userData){
            return NextResponse.json({success: false, message: "user not found please re-login"}, {status:400})
        }

        const searchProfileData = await user.find({$or: [
            {name : {$in : search}},
            {username: {$in : search}},
        ]})

        const searchRecipedata = await recipe.find({$or: [
            {recipeName : {$in : search}},
            {category: {$in : search}},
            {cafeUser: {$in : searchProfileData.map((element)=>{return element._id})}}
        ]}).populate("cafeUser")

        const searchData = {profile: searchProfileData, recipe: searchRecipedata}

        return NextResponse.json({success: true, data: searchData, user:{id: userData._id, username: userData.username}})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})
    }
}