import sqlite3 from 'sqlite3';

//- DATABASE OPEN CONNECTION
function connectDB() {
  const db = new sqlite3.Database('database.db', err => {
    if (err) {
      console.error(err.message);
    }
    console.log('✅ Connected to the database');
  });
  return db;
}
//- DATABASE CLOSE CONNECTION
function closeDB(db) {
  db.close(err => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
//-/////////////////////

//- GET ALL TODOS
export function getTodos(res) {
  const db = connectDB();
  db.all('SELECT todoId id,todoText text FROM todos', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else {
      const todos = { todos: rows };
      // console.log(rows);
      res.send(todos);
    }
  });
  closeDB(db);
}

export function addTodo(req, res) {
  const db = connectDB(req, res);
  db.run(`INSERT INTO todos(todoText) VALUES(?)`, [req.body], err => {
    if (err) {
      console.error(err.message);
    }
    const message = 'Row added';
    console.log(message);
    res.send(message);
  });
  closeDB(db);
}

export function deleteTodo(id, res) {
  const db = connectDB();

  db.run(`DELETE FROM todos WHERE todoId=?`, id, err => {
    if (err) {
      return console.error(err.message);
    }
    const message = `Row deleted`;
    console.log(message);
    res.send(message);
  });

  closeDB(db);
}
