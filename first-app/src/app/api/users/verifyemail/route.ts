import {connect} from '@/dbconfig/dbconfig';
import { NextRequest,NextResponse } from 'next/server';
import User from "@/models/userModel";

connect();

export async function POST(req:NextRequest) {
    console.log("a verify email request came ....");
    
    try {
        const {token} = await req.json();
        console.log("token for verify email : "+token);
        const user = await User.findOne({verifyToken:token,
            verifyTokenExpiry : {$gt : Date.now()}
        });
        console.log("user found : ",user);
        
        if(!user){
            return NextResponse.json({
                error : "Invalid token.. user nahi mila",
            },{status : 400});
        }

        user.isVerified = true;
        user.verifyTokenExpiry = undefined;
        user.verifyToken = undefined;
        await user.save();

        return NextResponse.json({
            message : "Email verified",
            success : true
        });
        
    } catch (error:any) {
        return NextResponse.json({
            error : error.message
        },{status : 500});
    }
}