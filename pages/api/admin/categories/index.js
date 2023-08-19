import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const newCategory = async (db, body, res) => {
  const category = await db.collection("Categories").insertOne(body);
  const newCategory = await db
    .collection("Categories")
    .find({ _id: new ObjectId(category.insertedId) })
    .toArray();
  res.status(200).json(newCategory);
};

const fetchCategories = async (db, res) => {
  const categories = await db
    .collection("Categories")
    .find({})
    .sort({ lastUpdated: -1 })
    .toArray();
  res.status(200).json(categories);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "GET") {
    await fetchCategories(db, res);
  }

  if (req.method === "POST") {
    const body = await req.body;
    await newCategory(db, body, res);
  }
}
