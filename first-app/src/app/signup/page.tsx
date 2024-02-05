"use client";
import { useEffect, useState } from "react";
import MyLink from "@/components/utils/ArrowLink";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthBtn from "@/components/utils/AuthBtn";


export default function Signup(){
    const [user,setUser]= useState({
        username : "",
        password : "",
        email : ""
    });
    const [btnState, setBtnState] = useState("disable");
    useEffect(()=>{
        if(user.username=="" || user.password=="" || user.email==""){
            if(btnState=="able") setBtnState("disable");
        } else setBtnState("able");
    },[user]);
    const router = useRouter();

    async function onSignup() { 
        try {
            setBtnState("loading");
            console.log("Sending request ....");
            
            const response = await axios.post("/api/users/signup",user);
            router.push("/login");
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
            <h1 onClick={onSignup} className="text-3xl my-3">SignUP</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" className="p-1 mx-3 my-3 rounded" 
            placeholder="username..." onChange={e=>{inputChange(e,'username')}}/>
            <br />
            <label htmlFor="username">Email</label>
            <input type="email" name="email" id="email" className="p-1 mx-3 my-3 rounded" 
            placeholder="email..." onChange={e=>{inputChange(e,'email')}}/>
            <br />
            <label htmlFor="password">Email</label>
            <input type="password" name="password" id="password" className="p-1 mx-3 my-3 rounded" 
            placeholder="password..." onChange={e=>{inputChange(e,'password')}}/>
            <br />
            <AuthBtn clickHandler={onSignup} btnState={btnState}>Signup</AuthBtn>
            <br />
            <MyLink to="/login">Login Now</MyLink>
        </div>
    )
}