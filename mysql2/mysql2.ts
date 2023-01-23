import { createPool, Pool } from 'mysql2/promise'
import { QueryOptions, ResultSetHeader, RowDataPacket } from 'mysql2'
import sql, { join, raw } from 'sql-template-tag'

let poolInstance: Pool | null = null
type DataRow = Record<string, any>

export type StringOrQueryOptions = string | QueryOptions

export const insertOne = async (query: StringOrQueryOptions, values?: any) => {
  const [results] = await runQuery<ResultSetHeader>(query, values)
  return results.insertId
}

export const autoInsert = async (tableName: string, data: DataRow) => {
  const { query, values } = buildAutoInsert(tableName, data)
  return insertOne(query, values)
}

export const buildAutoInsert = (tableName: string, data: DataRow) => {
  const keys = Object.keys(data)
  const values = Object.values(data)
  const columnNames = keys.join(', ')
  const placeholders = keys.map(() => '?').join(', ')
  const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders})`
  return { query, values }
}

export const autoSelect = async <Column extends string>(
  tableName: string,
  where: DataRow,
  columns: Column[]
): Promise<Array<Record<Column, any>>> => {
  const query = buildAutoSelect(tableName, where, columns)

  const rows = await select(query)
  return rows as Array<Record<Column, any>>
}

export const buildAutoSelect = <Column extends string>(
  tableName: string,
  where: DataRow,
  columns: Column[]
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

export const select = async <T extends DataRow>(query: StringOrQueryOptions, params?: any): Promise<Array<T>> => {
  const [rows] = await runQuery<RowDataPacket[]>(query, params)
  return rows as Array<T>
}

export const update = async (query: StringOrQueryOptions, params?: any) => {
  const [results] = await runQuery<ResultSetHeader>(query, params)
  return results.affectedRows
}

export const deleteQuery = async (query: StringOrQueryOptions, params?: any) => {
  const [results] = await runQuery<ResultSetHeader>(query, params)
  return results.affectedRows
}

export const close = async () => {
  if (poolInstance !== null) {
    await poolInstance.end()
    poolInstance = null
  }
}

const runQuery = async <T extends RowDataPacket[] | ResultSetHeader>(query: StringOrQueryOptions, values: any) => {
  if (typeof query === 'string') {
    return getPoolInstance().query<T>(query, values)
  }
  return getPoolInstance().query<T>(query, values)
}

const getPoolInstance = () => {
  if (poolInstance === null) {
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

export const clearTestTables = async (tableNames: string[], dbName = 'test') => {
  for (const tableName of tableNames) {
    const query = `DELETE FROM ${dbName}.${tableName}`
    await deleteQuery(query)
  }
}
