import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://EunSu:zcydiDJibDtxOpkn@nextapi.ffspq4w.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

// collection을 매개변수로 가지도록 변경
// => 매개변수로 얻게 되는 모든 컬렉션을 볼 수 있음
export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
