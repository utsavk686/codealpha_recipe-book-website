import { NextResponse } from "next/server";
import connectdb from "../../../../connectDB";
import { cookies } from "next/headers";
import { jwtCheck } from "../../../../middleware/jwtFunc";
import { user } from "../../../../model/user";
import bcrypt from "bcrypt"
import { recipe } from "../../../../model/recipe";


export async function GET(req){

    await connectdb()

    try {
        
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if(!jwt){
            return NextResponse.json({success: false, message: "please login"}, {status: 400})
        }

        const userData = await user.findOne({_id: {$eq: jwt._id}}).select("+following +email +favRecipes +myRecipes +followrs").populate(["followrs", "following"])

        if(!userData){
            return NextResponse.json({success:false, message: "user not found"}, {status: 404})
        }

        const myRecipes = await recipe.find({_id: {$in: userData.myRecipes}}).populate("cafeUser")
        const favRecipes = await recipe.find({_id: {$in: userData.favRecipes}}).populate("cafeUser")

        userData.myRecipes = myRecipes
        userData.favRecipes = favRecipes

        console.log(userData)

        return NextResponse.json({success:true, data: userData})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status:500})
    }

}

export async function PUT(req){
    await connectdb()

    try {
        
        const {name, username, email, password} = await req.json()

        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if(!jwt){
            return NextResponse.json({success: false, message: "please login"}, {status: 400})
        }

        if((!name && !username && !email) || !password){
            return NextResponse.json({success: false, message: "fill all field"}, {status: 400})
        }

        const userData = await user.findOne({_id: {$eq: jwt._id}}).select("+email +password")

        if(!userData){
            return NextResponse.json({success:false, message: "user not found"}, {status: 404})
        }

        if(username){
            const tempuser = await user.findOne({username: {$eq: username}})
            if(tempuser){
                return NextResponse.json({success: false, message: "enter unique username"}, {status: 400})
            }
        }

        const chackPass = await bcrypt.compare(password, userData.password)

        if(!chackPass){
            return NextResponse.json({success: false, message: "password is wrong"}, {status: 400})
        }

        if(username){
            userData.username = username
        }
        if(email){
            userData.email = email
        }
        if(name){
            userData.name = name
        }

        await userData.save()
        userData.password = "******"

        return NextResponse.json({success: true, data: userData})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status:500})
    }
}
