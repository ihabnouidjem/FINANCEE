import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const updateProject = async (db, res, pid, newItems) => {
  const updateProject = await db.collection("Projects").updateOne(
    { _id: ObjectId(pid) },
    {
      $set: newItems,
      $currentDate: { lastUpdated: true },
    }
  );
  const updatedProject = await db
    .collection("Projects")
    .findOne({ _id: ObjectId(pid) });

  res.status(200).json(updatedProject);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const { projectId } = await req.query;

  if (req.method === "POST") {
    const newItems = await req.body;

    await updateProject(db, res, projectId, newItems);
  }
}
