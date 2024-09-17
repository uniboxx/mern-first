import { useEffect, useState } from 'react';

import './App.css';

const BEURL = 'https://mern-first-backend-zt5v.onrender.com/';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(BEURL)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
