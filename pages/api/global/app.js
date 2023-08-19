import clientPromise from "@/lib/mongodb";

const getApp = async (db, res) => {
  const app = await db.collection("Global").findOne({ name: "app" });
  res.status(200).json(app);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "GET") {
    await getApp(db, res);
  }
}
