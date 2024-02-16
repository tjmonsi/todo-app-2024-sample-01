import { readFileSync, writeFileSync } from 'fs';
const filename = 'db.json';

export function saveDB (dbName, data) {
  // reads the file
  const db = JSON.parse(readFileSync(filename, 'utf-8') || '{}');  
  // if db is not there, create an empty object
  if (!db) db = {}
  // if a particular database is not there, create an empty object
  if (!db[`${dbName}`]) db[`${dbName}`] = {}
  // set the data with the id as the key, basically rewriting whatever is in there
  db[`${dbName}`][`${data.id}`] = data;
  // overwrites the file with the new data
  writeFileSync(filename, JSON.stringify(db, null, 2), 'utf-8');
}

export function readDB (dbName, id = null) {
  const db = JSON.parse(readFileSync(filename, 'utf-8') || '{}');
  if (!db) db = {}
  if (!db[`${dbName}`]) db[`${dbName}`] = {}
  // if there is id, just return that one
  if (id) return db[`${dbName}`][`${id}`]
  // if there is no id, return as an array of values
  return Object.values(db[`${dbName}`])
}

export function deleteItemDB (dbName, id) {
  const db = JSON.parse(readFileSync(filename, 'utf-8') || '{}');  
  if (!db) db = {}
  if (!db[`${dbName}`]) db[`${dbName}`] = {}
  // deletes that id from the database
  delete db[`${dbName}`][`${id}`]
  writeFileSync(filename, JSON.stringify(db, null, 2), 'utf-8');
}
