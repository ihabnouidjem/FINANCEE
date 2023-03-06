import clientPromise from "@/lib/mongodb";

export default async function Handler(req, res) {
  const { projectId } = await req.query;
  const client = await clientPromise;
  const db = await client.db("Profiles");
  if (req.method === "GET") {
    const oneProjects = await db
      .collection("Profiles")
      .findOne({ id: `${projectId}` });
    res.status(200).json(oneProjects);
  }
  if (req.method === "PUT" || req.method === "UPDATE") {
    const msg = { msg: "project updated" };
    const item = await req.body.item;

    const updateProject = await db.collection("Profiles").updateOne(
      { id: `${projectId}` },
      {
        $set: item,
        $currentDate: { lastUpdated: true },
      }
    );

    res.json(msg);
  }
}
