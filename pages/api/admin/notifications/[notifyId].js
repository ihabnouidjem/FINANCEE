import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const deleteNotification = async (db, res, notifyId) => {
  const deletedNotify = await db
    .collection("Notifications")
    .deleteOne({ _id: new ObjectId(notifyId) });

  const notifications = await db
    .collection("Notifications")
    .find({})
    .sort({ lastUpdated: -1 })
    .toArray();
  res.status(200).json(notifications);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const { notifyId } = await req.query;

  if (req.method === "DELETE") {
    await deleteNotification(db, res, notifyId);
  }
}
