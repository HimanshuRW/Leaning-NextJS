"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthBtn from "@/components/utils/AuthBtn";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup(){
    const [btnState, setBtnState] = useState("able");
    const router = useRouter();

    async function onLogout() { 
        try {
            setBtnState("loading");
            console.log("Sending request ....");
            
            const response = await axios.get("/api/users/logout");
            router.push("/login");
            
        } catch (error:any) {
            console.log("error in signup ");
            console.log(error.message);
            toast.error(error.message);
            
        }
    }

    return(
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl w-1/2 mx-auto my-20">
            <h1 className="text-3xl my-3">Profile</h1>
            <hr />
            <br />
            <AuthBtn clickHandler={onLogout} btnState={btnState}>Logout</AuthBtn>
        </div>
    )
}