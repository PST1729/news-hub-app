import { MongoClient } from 'mongodb';

let client = null;
let db = null;

export async function connectMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment');
  }
  client = new MongoClient(uri);
  await client.connect();
  db = client.db('news_hub');
  return db;
}

export function getDb() {
  return db;
}

export async function closeMongoDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
