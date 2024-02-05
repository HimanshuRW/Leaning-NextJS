import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

connect();


export async function GET(req: NextRequest) {
  try {

    // create response 
    const response = NextResponse.json({
        message : "Logout Successfull",
        success : true
    });
    response.cookies.set("token", "",{
        httpOnly : true,
        expires : new Date(0)
    });
    return response;
  } catch (error: any) {
    console.log("Error in get block of logout ....");
    console.log("err : ", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
