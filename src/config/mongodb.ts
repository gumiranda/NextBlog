import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI || ""; // trick ts :(
let dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local",
  );
}

export async function connectToDatabase() {
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);
  return { client, db };
}
