// import * as SQL from "sqlite3";
const SQL = require("sqlite3").verbose();
import * as path from "path";

// Valuable sources for further testing
// https://www.youtube.com/watch?v=mnH_1YGR2PM&ab_channel=CodingWithMike
// https://blog.pagesd.info/2019/10/29/use-sqlite-node-async-await/

const createSQLtable: string = `CREATE TABLE IF NOT EXISTS books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  comments TEXT
);`;

const insertIntoTable: string = `INSERT INTO Books (Title, Author, Comments) VALUES
  ('Mrs. Bridge', 'Evan S. Connell', 'First of the series'),
  ('Mr. Bridge', 'Evan S. Connell', 'Second in the series'),
  ('Lingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;

const getTable: string = "SELECT * FROM Books ORDER BY Title";

// If error 14 occurs, check if data.db exists in src folder
export const db = new SQL.Database(
  path.resolve(__dirname, "./data.db"), SQL.OPEN_READWRITE, (err: Error | null) => {
    if (err) return console.log("Couldn't connect to DB: Error:", err);
    console.log("connected to DB!");
    testDB();

  }
);

// TODO rework into async functions
const testDB = (): void => {
  try {
    // Create table
    db.run(createSQLtable, (err: Error | null) => {
      if (err) return console.log("Couldn't create table", err);
      console.log("created table");
      // insert into table
      db.run(insertIntoTable, (err: Error | null) => {
        if (err) return console.log("Couldn't insert into table", err);
        console.log("inserted into table");
        // Get data
        db.all(getTable, (err: Error | null, rows: []) => {
          if (err) return console.log("Couldn't create db", err);
          if (rows.length < 1) return console.log("No table match");
          return console.log("Rows: ", rows);
        });
      });
    });
  } catch (error) {
    console.log("error:", error);
  }
};
