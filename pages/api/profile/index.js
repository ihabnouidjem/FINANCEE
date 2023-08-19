import clientPromise from "@/lib/mongodb";

const newProfile = async (db, res, user) => {
  const profile = await db.collection("Profiles").insertOne(user);
  const newProfile = await db.collection("Profiles").findOne({ id: user.id });

  res.status(200).json(newProfile);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "POST") {
    const user = await req.body;
    await newProfile(db, res, user);
  }
}
