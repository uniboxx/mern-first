import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import './App.css';

const NODEJS_ENV = import.meta.env.MODE;
console.log(NODEJS_ENV);

const BEURL =
  NODEJS_ENV === 'production'
    ? 'https://mern-first-backend-zt5v.onrender.com'
    : 'http://localhost:3000';

function App() {
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const res = await fetch(BEURL + '/todos');
      const data = await res.json();

      // console.log(data);
      // console.log(data.todos);

      setTodos(data.todos);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function addTodo() {
    // console.log(text);
    const options = {
      method: 'POST',
      body: text,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    };
    try {
      const res = await fetch(BEURL + '/todos', options);
      const data = await res.text();

      console.log(data);

      getTodos();
    } catch (err) {
      console.log(err.message);
    }

    setText('');
  }
  async function deleteTodo(id) {
    const options = {
      method: 'DELETE',
      body: id,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    };
    try {
      const res = await fetch(BEURL + '/todos', options);
      const data = await res.text();

      console.log(data);

      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    //- add todo
    addTodo();
  }

  //- get message on mount
  useEffect(() => {
    async function getMessage() {
      const res = await fetch(BEURL);
      const data = await res.json();
      // console.log(data);
      setMessage(data.message);
    }
    getMessage();
  }, []);

  //- get todos on mount
  useEffect(() => {
    getTodos();
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
      <AnimatePresence>
        <ul>
          {todos.length > 0 &&
            todos.map(todo => (
              <motion.li
                layout
                key={todo.id}
                variants={{
                  hidden: { y: 30, scale: 1, rotate: 90 },
                  visible: { y: 0, scale: [0.8, 1.2, 1], rotate: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.5 }}
                onClick={() => deleteTodo(todo.id)}
              >
                {todo.text}
              </motion.li>
            ))}
        </ul>
      </AnimatePresence>
    </>
  );
}

export default App;
