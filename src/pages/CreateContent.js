import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateContent = ({ onCreate }) => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert('Fill both fields');
    const newPost = { id: Date.now(), title: title.trim(), content: content.trim() };
    onCreate(newPost);
    setTitle(''); setContent('');
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            style={{ width: '60%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
            rows={6}
            style={{ width: '60%', padding: 8 }}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateContent;
