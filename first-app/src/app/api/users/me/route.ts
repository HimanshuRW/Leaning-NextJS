import getTokenData from "@/helpers/getTokenData";

import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbconfig/dbconfig";

connect();

export async function GET(req:NextRequest) {
    try {
        const userID = await getTokenData(req);
        const user = await User.findOne({_id:userID}).select("-password");
        return NextResponse.json({
            message : "User found",
            data : user
        });
    } catch (error:any) {
        console.log("error in Get Function of me route");
        console.log(error);
        return NextResponse.json({
            error : error.message,
        },{status:400});
        
    }
}