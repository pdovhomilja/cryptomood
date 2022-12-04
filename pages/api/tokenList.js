// posts.js

import clientPromise from "../../database/mongodb-new";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("coingeckoData");
  const tokenList = await db.collection("tokenList").find({}).toArray();
  res.json({ status: 200, data: tokenList });
}
