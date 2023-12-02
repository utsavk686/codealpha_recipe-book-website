import { cookies } from "next/headers";
import connectdb from "../../../../../../connectDB";
import { jwtCheck } from "../../../../../../middleware/jwtFunc";
import { recipe } from "../../../../../../model/recipe";
import { user } from "../../../../../../model/user";
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
    await connectdb()
    try {

        const { recipeId, reviweId } = await params
        const token = cookies().get("token")
        const jwt = jwtCheck(token)
        if (!jwt) {
            return NextResponse.json({ success: false, message: "please login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwt._id } })
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 })
        }

        const recipeData = await recipe.findOne({ _id: { $eq: recipeId } })
        if (!recipeData) {
            return NextResponse.json({ success: false, message: "recipe not found" }, { status: 400 })
        }

        var deleteData;

        await recipeData.reviwe.map(async (element, index) => {
            if (element._id.toString() === reviweId) {
                if (element.user.toString() === userData._id.toString() || recipeData.cafeUser.toString() === userData._id.toString()) {
                    deleteData = element
                    recipeData.avgRating = recipeData.avgRating - deleteData.rating
                    await recipeData.reviwe.splice(index, 1)
                    return;
                }
            }
        })

        if (!deleteData) {
            return NextResponse.json({ success: false, message: "reviwe not found or you can delete other reviwe" }, { status: 400 })
        }

        await recipeData.save()

        return NextResponse.json({ success: true, data: recipeData, deleteData: deleteData })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "internal server error" }, { status: 500 })
    }
}