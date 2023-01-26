import { createPool } from 'mysql2/promise'
import sql, { join, raw } from 'sql-template-tag'

let poolInstance = null

const insertOne = async (query, values) => {
  const [results] = await runQuery(query, values)
  return results.insertId
}

const autoInsert = async (tableName, data) => {
  const { query, values } = buildAutoInsert(tableName, data)
  return insertOne(query, values)
}

const buildAutoInsert = (tableName, data) => {
  const keys = Object.keys(data)
  const values = Object.values(data)
  const columnNames = keys.join(', ')
  const placeholders = keys.map(() => '?').join(', ')
  const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders})`
  return { query, values }
}

const autoSelect = async (
  tableName,
  where,
  columns
) => {
  const query = buildAutoSelect(tableName, where, columns)

  const rows = await select(query)
  return rows
}

const buildAutoSelect = (
  tableName,
  where,
  columns
) => {
  const columnsStr = columns.join(', ')
  const whereArray = Object.keys(where).map((columnName) => {
    const value = where[columnName]
    const whereValue = sql`${raw(columnName)} = ${value}`
    return whereValue
  })
  const whereClause = join(whereArray, ' AND ')
  const query = join([
    sql`SELECT ${raw(columnsStr)} FROM ${raw(tableName)}`,
    whereClause
  ], ' WHERE ')
  return query
}

const select = async (query, params) => {
  const [rows] = await runQuery(query, params)
  return rows
}

const update = async (query, params) => {
  const [results] = await runQuery(query, params)
  return results.affectedRows
}

const deleteQuery = async (query, params) => {
  const [results] = await runQuery(query, params)
  return results.affectedRows
}

const close = async () => {
  if (poolInstance !== null) {
    await poolInstance.end()
    poolInstance = null
  }
}

const runQuery = async (query, values) => {
  if (typeof query === 'string') {
    return getPoolInstance().query(query, values)
  }
  return getPoolInstance().query(query, values)
}

const getPoolInstance = () => {

  if (poolInstance === null) {

    console.log('\n\n');
    console.log('crating poll instance => ');
    console.log('\n\n');

    const host = process.env.HOST || ''           //ex. 'localhost'
    const port = Number(process.env.PORT) || 3306 //ex. 3306
    const user = process.env.USER || ''           //ex. 'root'
    const password = process.env.PASSWORD || ''   //ex. '12345678'
    const database = process.env.DATABASE || ''   //ex. 'test'
    const charset = 'utf8mb4'

    poolInstance = createPool({
      host,
      port,
      user,
      password,
      database,
      charset
    })
  }
  return poolInstance
}

const clearTestTables = async (tableNames, dbName = 'test') => {
  for (const tableName of tableNames) {
    const query = `DELETE FROM ${dbName}.${tableName}`
    await deleteQuery(query)
  }
}

//==============================================
//==============================================

const main = async () => {

  const cartId=10

  const query = sql`SELECT * from carts WHERE c.id=${cartId}`

  console.log('\n\n');
  console.log(' => ', query);
  console.log('\n\n');

  const result = await select(query)

  console.log('\n\n');
  console.log('result => ', result);
  console.log('\n\n');

  close()
}

Promise.all[main()];