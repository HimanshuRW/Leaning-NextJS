"use client";

import axios from "axios";
import { useState,useEffect } from "react";

export default function VerifyEmail(){
    const [token,setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    async function verifyUserEmail(){
        try {
            console.log("request sending to baxckend...");
            
            const response = await axios.post("/api/users/verifyemail",{token})
            console.log("data from backend ",response);
            
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log("Error from verifyUserEmail function : ",error.response);      
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[]);

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token]);


    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl w-1/2 mx-auto my-20">
            <h1 className="text-3xl my-3">Verify Email</h1>
            <hr />
            <h3>{verified ? "Verified :)" : token ? `Verifing Token : ${token}` : "No tokens found..."}</h3>
            <p>{error ? "Error : "+error : null}</p>
        </div>
    )
}
