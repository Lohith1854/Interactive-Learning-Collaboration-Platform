// src/pages/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      setLoading(true);
      await signInWithEmailAndPassword(auth,email,password);
      nav("/dashboard");
    }catch(err){
      alert(err.message);
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:420,margin:24}}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"100%",padding:8,marginBottom:8}} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:"100%",padding:8,marginBottom:8}} />
      <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
