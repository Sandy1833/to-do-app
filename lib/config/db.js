import mongoose from "mongoose"

export const ConnectDB = async () =>{
    await mongoose.connect(`${process.env.MONGODB_URI}/todoproject`)
    console.log("DB connected");
}

// `${process.env.MONGODB_URI}/job-portal`