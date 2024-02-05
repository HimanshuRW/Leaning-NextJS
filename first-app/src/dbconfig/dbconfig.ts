import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.mongo_url !);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Mongodb connected sucessfully ....");
        });
        connection.on('error',(err)=>{
            console.log("Mongodb connection err...");
            console.log(err);
            // process.exit();
        });
    } catch (error){
        console.log("Cant connect to database ....");
        console.log(error);
    }
}