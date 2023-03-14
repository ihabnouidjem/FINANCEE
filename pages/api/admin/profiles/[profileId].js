import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function Handler(req, res) {
  const { profileId } = await req.query;

  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "POST") {
    const msg = { msg: "profile updated" };
    const items = await req.body.newItems;

    const updateProfile = await db.collection("Profiles").updateOne(
      { id: profileId },
      {
        $set: items,
        $currentDate: { lastUpdated: true },
      }
    );

    res.json(msg);
  }
}
