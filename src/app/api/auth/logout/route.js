import { NextResponse } from "next/server";
import connectdb from "../../../../../connectDB";
import { cookies } from "next/headers";


export async function GET(req) {

    await connectdb()

    try {

        const token = cookies().get("token")
        if(!token){
            return NextResponse.json({success: false, message: "no account login"}, {status: 400})
        }

        cookies().set({
            name: "token",
            value: "",
            maxAge: 0
        })

        return NextResponse.json({success: true, message: "account logout successfully"})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})
    }
}