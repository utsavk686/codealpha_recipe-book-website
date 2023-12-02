import mongoose from "mongoose";

const connectdb = async() =>{
    try {

        if(!mongoose.connection.readyState){
            const conection = await mongoose.connect(process.env.MONGO_URI)
            console.log(`DataBase connected: ${conection.connection.host}`)
        }else{
            console.log(`DataBase ${mongoose.connection.host}`)
        }

    } catch (error) {
        console.log("DataBase not connected")
        console.log(error)
    }
}

export default connectdb