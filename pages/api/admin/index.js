import clientPromise from "@/lib/mongodb";

const fetchNotifications = async (db) => {
  const allNotifications = await db
    .collection("Notifications")
    .find()
    .toArray();
  return allNotifications;
};

const fetchProfiles = async () => {};

const editProfileStatus = async () => {};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "POST") {
    const msg = { msg: "profile updated" };
    const items = await req.body.newItems;
    console.log(items);
    const updateProfile = await db.collection("Profiles").updateMany(
      {},
      {
        $set: items,
        $currentDate: { lastUpdated: true },
      },
      { multi: true }
    );

    res.json(msg);
  }

  if (req.method === "GET") {
    const notifications = await fetchNotifications(db);
    res.json({ notifications: notifications });
  }

  // if (req.method === "DELETE") {
  //   const nid = await req.body?.nid;
  //   const notifications = await deleteNotification(db, nid);
  //   res.json({ msg: "notification deleted" });
  // }
}
