import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendMail} from '@/helpers/mailer';

connect();

export async function POST(req:NextRequest) {
    console.log("Post request came .....");
    
    try {
        const body = await req.json();
        const {username, email,password} = body;
        console.log("body at POST funtion in route : ",body);

        // check if user already exist
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({
                error : "User already Exist"
            },{status:400});
        }

        // hash the password
        const salt = await bcryptjs.genSalt(10); 
        const hashedPassowrd = await bcryptjs.hash(password,salt);

        const newUser = new User ({
            username, email, password : hashedPassowrd
        });

        const savedUser = await newUser.save();
        console.log("User saved successfully.....");
        console.log(savedUser);

        // send verification email
        await sendMail({email,emailType : "VERIFY",userId : savedUser._id});

        return NextResponse.json({
            message : "User created successfully",
            success : true,
            savedUser
        },{status : 201});
        

        
    } catch (error:any) {
        console.log("Error in post block ....");
        console.log("err : ",error);
        
        
        return NextResponse.json({
            error : error.message,
        },{status:500});
    }
}
