import React from 'react';

export default function Home({ message }) {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>React + Laravel + Inertia çalışıyor</h1>
      <p>{message}</p>
    </div>
  );
}