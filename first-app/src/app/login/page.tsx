"use client";
import { useState,useEffect } from "react";
import MyLink from "@/components/utils/ArrowLink";
import { useRouter } from "next/navigation";
import AuthBtn from "@/components/utils/AuthBtn";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup(){
    const [user,setUser]= useState({
        password : "",
        email : ""
    });
    const [btnState, setBtnState] = useState("disable");

    useEffect(()=>{
        if(user.password=="" || user.email==""){
            if(btnState=="able") setBtnState("disable");
        } else setBtnState("able");
    },[user]);
    const router = useRouter();

    async function onLogin() { 
        try {
            setBtnState("loading");
            console.log("Sending request ....");
            
            const response = await axios.post("/api/users/login",user);
            router.push("/profile");
            
        } catch (error:any) {
            console.log("error in signup ");
            console.log(error.message);
            toast.error(error.message);
            
        } finally{
            setBtnState("disable");
        }
    }

    function inputChange(e:any,what:string){
        setUser({...user,[what]: e.target.value});
    }

    return(
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl w-1/2 mx-auto my-20">
            <h1 className="text-3xl my-3">Login</h1>
            <hr />
            <label htmlFor="username">Email</label>
            <input type="email" name="email" id="email" className="p-1 mx-3 my-3 rounded" 
            placeholder="email..." onChange={e=>{inputChange(e,'email')}}/>
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="p-1 mx-3 my-3 rounded" 
            placeholder="password..." onChange={e=>{inputChange(e,'password')}}/>
            <br />
            <AuthBtn clickHandler={onLogin} btnState={btnState}>Login</AuthBtn>
            <br />
            <MyLink to="/signup">Register Now</MyLink>
        </div>
    )
}