import clientPromise from "@/lib/mongodb";

const fetchGlobal = async (db) => {
  const global = await db.collection("Global").find().toArray();
  return global;
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  //   if (req.method === "POST") {
  //     const msg = { msg: "profile updated" };
  //     const items = await req.body.newItems;
  //     console.log(items);
  //     const updateProfile = await db.collection("Profiles").updateMany(
  //       {},
  //       {
  //         $set: items,
  //         $currentDate: { lastUpdated: true },
  //       },
  //       { multi: true }
  //     );

  //     res.json(msg);
  //   }

  if (req.method === "GET") {
    const global = await fetchGlobal(db);
    res.json({ global: global });
  }
}
