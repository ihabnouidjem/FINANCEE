import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const newCampaign = async (db, body, res) => {
  const campaign = await db.collection("Campaigns").insertOne(body);
  const campaigns = await db.collection("Campaigns").find({}).toArray();
  res.status(200).json(campaigns);
};

const fetchCampaigns = async (db, res) => {
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

  if (req.method === "GET") {
    await fetchCampaigns(db, res);
  }

  if (req.method === "POST") {
    const body = await req.body;
    await newCampaign(db, body, res);
  }
}
