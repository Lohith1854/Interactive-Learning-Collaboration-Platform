import React from 'react';

const Home = ({ posts }) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Home</h1>
      {posts.length === 0 ? (
        <p>No content yet. Ask a mentor to publish something!</p>
      ) : (
        posts.map(p => (
          <div key={p.id} style={{ marginBottom: 20, borderBottom: '1px solid #ddd', paddingBottom: 8 }}>
            <h2>{p.title}</h2>
            <p>{p.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
