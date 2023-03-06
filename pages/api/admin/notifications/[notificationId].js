import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// const addNotification = async (db, notification) => {
//   const addNotify = await db
//     .collection("Notifications")
//     .insertOne(notification);
// };
const deleteNotification = async (db, nid) => {
  const deleteNotify = await db
    .collection("Notifications")
    .deleteOne({ _id: new ObjectId(nid) });
};
export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  const { notificationId } = await req.query;
  const notification = await req.body;

  // if (req.method === "POST") {
  //   addNotification(db, notification);
  // }

  if (req.method === "DELETE") {
    const notifications = await deleteNotification(db, notificationId);
    res.json({ msg: "notification deleted" });
  }
}
