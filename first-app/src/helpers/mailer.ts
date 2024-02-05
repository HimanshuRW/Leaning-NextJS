import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function sendMail({ email, emailType, userId }: any) {
  try {
    // create a hashed Token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 60,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 60,
      });
    }

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD
        }
    });

    const mailOptions = {
        from : "NextJs@gmail.com",
        to : email,
        subject : emailType=="VERIFY" ? "Verify Your Email" : "Reset Your Password",
        html : `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">Here</a>
        to ${emailType=="VERIFY" ? "verify your email" : "reset your password"}</p>`
    }

    const mailResponse = await transport.sendMail(mailOptions);

  } catch (error: any) {
    throw new Error(error.message);
  }
}
