/**
 * Database setup script — run once to create collections with validators and indexes.
 * Usage:  node scripts/setup-db.js
 */
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { articleValidator, articleIndexes } from '../src/models/Article.js';
import { chatValidator, chatIndexes } from '../src/models/Chat.js';

const DB_NAME = 'news_hub';

async function collectionExists(db, name) {
  const list = await db.listCollections({ name }).toArray();
  return list.length > 0;
}

async function setupCollection(db, name, validator, indexes) {
  const exists = await collectionExists(db, name);

  if (exists) {
    // Update the validator on the existing collection
    await db.command({
      collMod: name,
      validator,
      validationLevel: 'moderate', // existing docs are not re-validated; only new writes/updates
      validationAction: 'error',
    });
    console.log(`  ✓ "${name}" — validator updated`);
  } else {
    await db.createCollection(name, {
      validator,
      validationLevel: 'moderate',
      validationAction: 'error',
    });
    console.log(`  ✓ "${name}" — collection created`);
  }

  const collection = db.collection(name);
  const results = await collection.createIndexes(indexes);
  console.log(`  ✓ "${name}" — indexes created/confirmed: ${results.join(', ')}`);
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('✗ MONGODB_URI is not set in .env');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(`✓ Connected to MongoDB\n`);

    const db = client.db(DB_NAME);
    console.log(`Setting up database: "${DB_NAME}"\n`);

    await setupCollection(db, 'articles', articleValidator, articleIndexes);
    await setupCollection(db, 'chats', chatValidator, chatIndexes);

    console.log('\n✓ Database schema setup complete!');
    console.log('\nCollections ready:');
    const collections = await db.listCollections().toArray();
    collections.forEach((c) => console.log(`  - ${c.name}`));
  } catch (err) {
    console.error('✗ Setup failed:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
