import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function Handler(req, res) {
  const { projectId } = await req.query;

  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "POST") {
    const msg = { msg: "project updated" };
    const items = await req.body.newItems;

    const updateProfile = await db.collection("Projects").updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: items,
        $currentDate: { lastUpdated: true },
      }
    );

    res.json(msg);
  }
}
