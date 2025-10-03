// src/pages/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        role,
        points: 0,
        badges: [],
        joinedAt: serverTimestamp(),
      });
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:480,margin:24}}>
      <h2>Create account</h2>
      <div>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required style={{width:"100%",padding:8,marginBottom:8}} />
      </div>
      <div>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"100%",padding:8,marginBottom:8}} />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:"100%",padding:8,marginBottom:8}} />
      </div>
      <div>
        <label><input type="radio" checked={role==="learner"} onChange={()=>setRole("learner")} /> Learner</label>
        <label style={{marginLeft:12}}><input type="radio" checked={role==="mentor"} onChange={()=>setRole("mentor")} /> Mentor</label>
      </div>
      <div style={{marginTop:12}}>
        <button type="submit" disabled={loading}>{loading ? "Please wait..." : "Sign up"}</button>
      </div>
    </form>
  );
}
