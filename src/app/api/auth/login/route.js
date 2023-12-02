import { NextResponse } from "next/server";
import connectdb from "../../../../../connectDB";
import { user } from "../../../../../model/user";
import bcrypt from "bcrypt"
import { jwtGen } from "../../../../../middleware/jwtFunc";
import { cookies } from 'next/headers'


export async function POST(req){
    
    await connectdb()

    try {
        
        const {username, password} = await req.json()
        if(!username || !password){
            return NextResponse.json({success: false, message: "fill all field"}, {status: 400})
        }

        const userData = await user.findOne({username: {$eq: username}}).select("+password")

        if (!userData || !(await bcrypt.compare(password, userData.password))){
            return NextResponse.json({success: false, message: "wrong username or password"}, {status: 400})
        }

        const token = jwtGen({_id: userData._id})

        cookies().set({
            name: "token",
            value: token,
            secure: true,
            httpOnly: true
        })

        userData.password = "******"

        return NextResponse.json({success: true, data: userData, token: token})

    } catch (error) {
        console.log(error)
        console.log("error", error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})
    }
}