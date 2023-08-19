import clientPromise from "@/lib/mongodb";

const newNotification = async (db, body, res) => {
  const notification = await db.collection("Notifications").insertOne(body);
  const notify = await db
    .collection("Notifications")
    .find({ _id: notification.insertedId })
    .toArray();
  res.status(200).json(notify);
};

const fetchNotifications = async (db, res) => {
  const notifications = await db
    .collection("Notifications")
    .find({})
    .sort({ lastUpdated: -1 })
    .toArray();
  res.status(200).json(notifications);
};

const delNotifications = async (db, res) => {
  const notifications = await db.collection("Notifications").deleteMany({});
  res.status(200).json([]);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "GET") {
    await fetchNotifications(db, res);
  }

  if (req.method === "POST") {
    const body = await req.body;
    await newNotification(db, body, res);
  }

  if (req.method === "DELETE") {
    const body = await req.body;
    await delNotifications(db, res);
  }
}
