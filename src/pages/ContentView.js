// src/pages/ContentView.js
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ContentView(){
  const { id } = useParams();
  const [content,setContent] = useState(null);
  const [comments,setComments] = useState([]);
  const [commentText,setCommentText] = useState("");
  const { user } = useAuth();

  useEffect(()=>{
    async function load(){
      const dref = doc(db,"contents",id);
      const snap = await getDoc(dref);
      if(!snap.exists()) return setContent(null);
      const data = snap.data();
      setContent({ id:snap.id, ...data });

      // increment views (best-effort)
      try { await updateDoc(dref, { views: (data.views || 0) + 1 }); } catch(e) { /* ignore */ }

      // load comments
      const q = query(collection(db,"comments"), where("contentId","==",id));
      const cs = await getDocs(q);
      setComments(cs.docs.map(d=>({ id:d.id, ...d.data() })));
    }
    load();
  },[id]);

  async function postComment(e){
    e.preventDefault();
    if(!user) return alert("Login to comment");
    await addDoc(collection(db,"comments"), { contentId: id, userId: user.uid, userName: user.name || user.email, text: commentText, createdAt: new Date() });
    setCommentText("");
    // reload comments
    const q = query(collection(db,"comments"), where("contentId","==",id));
    const cs = await getDocs(q);
    setComments(cs.docs.map(d=>({ id:d.id, ...d.data() })));
  }

  if(content === null) return <div style={{padding:20}}>Content not found</div>;
  if(!content) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <h2>{content.title}</h2>
      <p style={{color:"#666"}}>By {content.authorName}</p>
      <div style={{whiteSpace:"pre-wrap",marginTop:12}}>{content.body}</div>
      <div style={{marginTop:16,color:"#777"}}>Views: {content.views}</div>

      <hr />
      <h3>Comments</h3>
      {comments.length === 0 && <div>No comments yet</div>}
      {comments.map(c=>(
        <div key={c.id} style={{padding:8,borderBottom:"1px solid #eee"}}>
          <b>{c.userName || c.userId}</b>
          <div>{c.text}</div>
        </div>
      ))}

      <form onSubmit={postComment} style={{marginTop:12}}>
        <input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Write a comment" required style={{width:"80%",padding:8,marginRight:8}} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
