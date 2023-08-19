import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const delCampaign = async (db, campId, res) => {
  const campaign = await db
    .collection("Campaigns")
    .deleteOne({ _id: new ObjectId(campId) });
  const campaigns = await db
    .collection("Campaigns")
    .find({})
    .sort({ lastUpdated: -1 })
    .toArray();
  res.status(200).json(campaigns);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "DELETE") {
    const { campId } = await req.query;
    await delCampaign(db, campId, res);
  }
}
