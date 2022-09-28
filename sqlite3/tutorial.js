/*
- https://www.npmjs.com/package/sqlite3
- https://www.sqlitetutorial.net/sqlite-nodejs/connect/

NOTES
- that opening (new sqlite3.Database) and closing (db.close) are async ops for an in-memory and persisted db.
- given the sequence of when the callbacks are put on the event loop, the callbacks will appear to be called synchronously but that is because sqlite will execute each db.__ instruction one by one.
- the below example scripts when run will seem synchronous but they are not
*/

// ==========================================
// IN-MEMORY
// ==========================================
// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(":memory:");

// db.serialize(() => {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (let i = 0; i < 10; i++) {
//     stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//     console.log(row.id + ": " + row.info);
//   });
// });

// db.close();

// ==========================================
// IN-MEMORY
// ==========================================
const sqlite3 = require("sqlite3").verbose();

// open database in memory
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});

// ==========================================
// PERSISTED DB
// ==========================================
// const sqlite3 = require("sqlite3").verbose();

// // open the database
// let db = new sqlite3.Database(
//   "./db/chinook.db",
//   sqlite3.OPEN_READWRITE,
//   (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log("Connected to the chinook database.");
//   }
// );

// db.serialize(() => {
//   db.each(
//     `SELECT PlaylistId as id,
//                   Name as name
//            FROM playlists`,
//     (err, row) => {
//       if (err) {
//         console.error(err.message);
//       }
//       console.log(row.id + "\t" + row.name);
//     }
//   );
// });

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Close the database connection.");
// });
