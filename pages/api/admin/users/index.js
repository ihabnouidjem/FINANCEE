import clientPromise from "@/lib/mongodb";

const newUser = async (db, body, res) => {};

const fetchUsers = async (db, res) => {
  const users = await db
    .collection("Profiles")
    .find({})
    .sort({ lastUpdated: -1 })
    .toArray();
  res.status(200).json(users);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const body = await req.body;

  if (req.method === "POST") {
    await newUser(db, body, res);
  }

  if (req.method === "GET") {
    await fetchUsers(db, res);
  }
}
