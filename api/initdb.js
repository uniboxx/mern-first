import sqlite3 from 'sqlite3';

//- DATABASE CONNECTION
const db = new sqlite3.Database('database.db', err => {
  if (err) {
    console.error(err.message);
  }
  console.log('✅ Connected to the database');
});
//-/////////////////////

db.serialize(() => {
  db.run(
    'CREATE TABLE todos([todoId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,[todoText] NVARCHAR(160) NOT NULL)'
  )
    .run(
      `INSERT INTO todos(todoText)
    VALUES('prova di testo 1'),('prova di testo 2')`
    )
    .each(`SELECT todoId, todoText FROM todos`, (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row.todoId, row.todoText);
    });
});

db.close(err => {
  if (err) {
    return console.error(err.message);
  }
});
