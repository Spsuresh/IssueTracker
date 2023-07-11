const { MongoClient } = require("mongodb");

const url = "mongodb+srv://spsuri777:Spsuresh97@cluster0.cnm7vua.mongodb.net/";
const dbName = "issueTracker";
const collectionName = "IssueTrackerSP";

async function mongoDB() {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = mongoDB;
