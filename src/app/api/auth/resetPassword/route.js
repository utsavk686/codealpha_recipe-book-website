import { NextResponse } from "next/server";
import connectdb from "../../../../../connectDB";
import { user } from "../../../../../model/user";
import sendMail from "../../../../../middleware/sendMail";
import { cookies } from "next/headers";
import bcrypt from "bcrypt"


export async function POST(req){
    await connectdb()

    try {
        const {email, userName} = await req.json()

        if(!email || !userName){
            return NextResponse.json({success: false, message: "enter email and username"},{status: 400})
        }

        const userData = await user.findOne({username: {$eq: userName}}).select("+email +resetOtp +resetDate")
        console.log(userData.email , email)
        if(!userData || userData.email !== email){
            return NextResponse.json({success: false, message: "wrong email or username"},{status: 400})
        }

        const otp = Math.floor( Math.random() * (999999 - 111111) + 111111 )

        const sendOtp = sendMail(userData.email, "Reset password", `opt for change password opt is ${otp}`)

        if(!sendOtp){
            return NextResponse.json({success: false, message: "error email not send"},{status: 400})
        }

        cookies().set({
            name: "email",
            value: email,
            secure: true,
            httpOnly: true,
            maxAge: 60*20
        })

        cookies().set({
            name: "userName",
            value: userName,
            secure: true,
            httpOnly: true,
            maxAge: 60*20
        })

        const currentdate = new Date()

        userData.resetOtp = otp
        userData.resetDate = currentdate.getTime() + (15 * 60 * 1000)
        await userData.save()

        return NextResponse.json({success: true, message: "OTP send on email"})


    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"},{status: 500})
    }
}

export async function PUT(req){
    await connectdb()

    try {
        const {otp, password} = await req.json()

        if(!otp || !password){
            return NextResponse.json({success: false, message: "enter otp and password"},{status: 400})
        }

        const userName = cookies().get("userName")?.value
        const email = cookies().get("email")?.value
        if(!userName || !email){
            return NextResponse.json({success: false, message: "email not set retry"},{status: 400})
        }

        const userData = await user.findOne({username: {$eq: userName}}).select("+email +resetOtp +resetDate +password")
        if(!userData || userData.email !== email){
            return NextResponse.json({success: false, message: "user not found or set email wrong"},{status: 400})
        }

        if(Number.parseInt(otp) !== userData.resetOtp){
            return NextResponse.json({success: false, message: "wrong Otp"},{status: 400})
        }

        const currentTime = new Date()
        if(userData.resetDate.getTime() < currentTime.getTime()){
            return NextResponse.json({success: false, message: "Otp expire"},{status: 400})
        }

        userData.password = await bcrypt.hash(password, 10)
        userData.resetOtp = null
        userData.resetDate = null
        await userData.save()

        cookies().set({
            name: "email",
            value: email,
            secure: true,
            httpOnly: true,
            maxAge: 0
        })

        cookies().set({
            name: "userName",
            value: userName,
            secure: true,
            httpOnly: true,
            maxAge: 0
        })

        return NextResponse.json({success: true, message: "password change successfully"})


    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"},{status: 500})
    }
}