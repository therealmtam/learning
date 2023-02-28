const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

const main = async() => {
  // open the database
  const db = await sqlite.open({
    // filename: '/tmp/database.db',
    filename: './sql.db',
    driver: sqlite3.Database
  })

  const res = await db.exec('SELECT * from carts')

  console.log('\n\n');
  console.log('here => ', res);
  console.log('\n\n');
}

main()