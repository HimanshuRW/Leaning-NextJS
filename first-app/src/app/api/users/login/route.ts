import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

connect();

function compareAsync(param1:String, param2:String) {
    return new Promise(function(resolve, reject) {
        bcryptjs.compare(param1, param2, function(err:any, res:any) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // check if user already exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User doesn't Exist",
        },
        { status: 400 }
      );
    }
    console.log("we got the user.. ", user);

    // check the password
    console.log("check ---   password : "+password+", user.password : "+user.password);
    
    const validPassword = await compareAsync(password, user.password);
    console.log(validPassword);
    
    console.log("Password is valid !!!!");

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    console.log("token data : ", tokenData);

    //create token
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log("token : ", token);

    // creat response
    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log("Error in post block of login ....");
    console.log("err : ", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
