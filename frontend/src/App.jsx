import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import './App.css';

const NODEJS_ENV = import.meta.env.MODE;
console.log(NODEJS_ENV);

const BEURL =
  NODEJS_ENV === 'production'
    ? 'https://mern-first-backend-zt5v.onrender.com/'
    : 'http://localhost:8000';

function App() {
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const id = nanoid();
    // console.log(id);
    const newTodo = { id, text };
    // console.log(newTodo);
    const options = {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json',
      },
    };
    fetch(BEURL + '/todos', options);
    // .then(res => console.log(res))
    // .then(data => console.log(data))
    // .catch(err => console.error(err));

    setTodos(prev => [newTodo, ...prev]);
    setText('');
  }

  useEffect(() => {
    fetch(BEURL)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, [message]);

  useEffect(() => {
    fetch(BEURL + '/todos')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setTodos(data.todos);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="todo">Todo</label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </p>
      </form>
      <ul>
        {todos.length > 0 &&
          todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </>
  );
}

export default App;
