import clientPromise from "@/lib/mongodb";

const updateProfile = async (db, newItems, res, pid) => {
  const updateProfile = await db.collection("Profiles").updateOne(
    { id: pid },
    {
      $set: newItems,
      $currentDate: { lastUpdated: true },
    }
  );
  const updatedProfile = await db.collection("Profiles").findOne({ id: pid });

  res.status(200).json(updatedProfile);
};

const getProfile = async (db, res, pid) => {
  const profile = await db.collection("Profiles").findOne({ id: pid });

  await res.status(200).json(profile);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const { profileId } = await req.query;
  const form = await req.body;

  if (req.method === "POST") {
    const newItems = await req.body;
    await updateProfile(db, newItems, res, profileId);
  }

  if (req.method === "GET") {
    await getProfile(db, res, profileId);
  }
}
