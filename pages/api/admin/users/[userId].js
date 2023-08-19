import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const updateUser = async (db, res, pid, newItems) => {
  const updateUser = await db.collection("Profiles").updateOne(
    { _id: ObjectId(pid) },
    {
      $set: newItems,
      $currentDate: { lastUpdated: true },
    }
  );
  const updatedUser = await db
    .collection("Profiles")
    .findOne({ _id: ObjectId(pid) });

  res.status(200).json(updatedUser);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const { userId } = await req.query;

  if (req.method === "POST") {
    const newItems = await req.body;

    await updateUser(db, res, userId, newItems);
  }
}
