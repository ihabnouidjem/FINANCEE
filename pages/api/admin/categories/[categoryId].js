import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const delCategory = async (db, categoryId, res) => {
  const category = await db
    .collection("Categories")
    .deleteOne({ _id: new ObjectId(categoryId) });
  const categories = await db.collection("Categories").find({}).toArray();
  res.status(200).json(categories);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "DELETE") {
    const { categoryId } = await req.query;
    await delCategory(db, categoryId, res);
  }
}
