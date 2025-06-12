import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://naiksandesh1998:sandy183@cluster0.pn44hcn.mongodb.net/todoproject')
    console.log("DB connected");
}