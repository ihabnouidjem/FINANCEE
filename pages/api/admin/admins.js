import clientPromise from "@/lib/mongodb";

const newAdmin = async (db, body, res) => {};

const fetchAdmins = async (db, res) => {
  const admins = await db
    .collection("Profiles")
    .find({ status: "admin" })
    .sort({ lastUpdated: -1 })
    .toArray();
  res.status(200).json(admins);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const body = await req.body;

  if (req.method === "POST") {
    await newAdmin(db, body, res);
  }

  if (req.method === "GET") {
    await fetchAdmins(db, res);
  }
}
