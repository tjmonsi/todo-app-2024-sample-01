import { readFileSync, writeFileSync } from 'fs';
const filename = 'db.json';

export function saveDB (dbName, data) {
  const db = JSON.parse(readFileSync(filename, 'utf-8') || '{}');  
  if (!db) db = {}
  if (!db[`${dbName}`]) db[`${dbName}`] = {}
  db[`${dbName}`][`${data.id}`] = data;
  writeFileSync(filename, JSON.stringify(db, null, 2), 'utf-8');
}

export function readDB (dbName, id = null) {
  const db = JSON.parse(readFileSync(filename, 'utf-8') || '{}');
  if (!db) db = {}
  if (!db[`${dbName}`]) db[`${dbName}`] = {}
  if (id) return db[`${dbName}`][`${id}`]
  return Object.values(db[`${dbName}`])
}

export function deleteItemDB (dbName, id) {
  const db = JSON.parse(readFileSync(filename, 'utf-8') || '{}');  
  if (!db) db = {}
  if (!db[`${dbName}`]) db[`${dbName}`] = {}
  delete db[`${dbName}`][`${id}`]
  writeFileSync(filename, JSON.stringify(db, null, 2), 'utf-8');
}
