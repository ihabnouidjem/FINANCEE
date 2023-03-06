import clientPromise from "@/lib/mongodb";

const addNotification = async (db, notification) => {
  const addNotify = await db
    .collection("Notifications")
    .insertOne(notification);
};
export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  const notification = await req.body;

  if (req.method === "POST") {
    addNotification(db, notification);
    res.status(200).json({ msg: "notification added" });
  }
}
