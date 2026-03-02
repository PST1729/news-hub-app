import 'dotenv/config';
import { MongoClient } from 'mongodb';

// Use direct hosts from nslookup SRV (bypasses dns.resolveSrv which is broken on this network)
const directUri = 'mongodb://sejalrgoyal_db_user:CJo9ndbajeqLr6e8@' +
  'ac-nceuqxs-shard-00-00.aqipi9b.mongodb.net:27017,' +
  'ac-nceuqxs-shard-00-01.aqipi9b.mongodb.net:27017,' +
  'ac-nceuqxs-shard-00-02.aqipi9b.mongodb.net:27017' +
  '/?authSource=admin&tls=true&appName=Cluster0';

console.log('--- Testing direct MongoDB connection (no SRV DNS) ---');
try {
  const client = new MongoClient(directUri, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  const db = client.db('news_hub');
  const collections = await db.listCollections().toArray();
  console.log(`Connected to news_hub! Collections: ${collections.length}`);
  console.log('Direct URI works:', directUri.replace(/:[^:@]+@/, ':***@'));
  await client.close();
} catch (e) {
  console.log('Direct connection failed:', e.message);
}
