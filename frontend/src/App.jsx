import { useEffect, useState } from 'react';

import './App.css';

const NODEJS_ENV = import.meta.env.MODE;
console.log(NODEJS_ENV);

const BEURL =
  NODEJS_ENV === 'production'
    ? 'https://mern-first-backend-zt5v.onrender.com/'
    : 'http://localhost:8000';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(BEURL)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, [message]);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
