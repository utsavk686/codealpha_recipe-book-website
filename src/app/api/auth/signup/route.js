import { NextResponse } from "next/server"
import connectDB from "../../../../../connectDB"
import bcrypt from "bcrypt"
import { user } from "../../../../../model/user"


export async function POST(req){

    await connectDB()

    try {
        
        const {username, name, email, password} = await req.json()

        if(!username || !name || !email || !password){
            return NextResponse.json({success: false, message: "fill all field"}, {status: 400})
        }

        const findUser = await user.findOne({username: {$eq: username}})
        if(findUser){
            return NextResponse.json({success: false, message: "user already exist"}, {status: 400})
        }

        const encryptPassword = await bcrypt.hash(password, 10)

        const userData = await user.create({
            username: username,
            name: name,
            email: email,
            password: encryptPassword
        })

        console.log(userData)

        return NextResponse.json({success: true, message: "account created"}, {status:401})

    } catch (error) {
        console.log("error", error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})
    }

}