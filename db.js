import { readFileSync, writeFileSync } from 'fs';
const filename = 'db.json';

function getDB (dbName) {
  // reads the file
  const db = JSON.parse(readFileSync(filename, 'utf-8') || '{}');  
  // if db is not there, create an empty object
  if (!db) db = {}
  // if a particular database is not there, create an empty object
  if (!db[`${dbName}`]) db[`${dbName}`] = {}
  return db
}

export function saveDB (dbName, data) {
  const db = getDB(dbName);
  // set the data with the id as the key, basically rewriting whatever is in there
  db[`${dbName}`][`${data.id}`] = data;
  // overwrites the file with the new data
  writeFileSync(filename, JSON.stringify(db, null, 2), 'utf-8');
}

export function readDB (dbName, id = null) {
  const db = getDB(dbName);
  // returns one item or an array of items if id is not null or null respectively
  return id ? db[`${dbName}`][`${id}`] : Object.values(db[`${dbName}`])
}

export function deleteItemDB (dbName, id) {
  const db = getDB(dbName)
  // deletes that id from the database
  delete db[`${dbName}`][`${id}`]
  writeFileSync(filename, JSON.stringify(db, null, 2), 'utf-8');
}
