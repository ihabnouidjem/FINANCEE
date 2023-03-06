import clientPromise from "@/lib/mongodb";

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  if (req.method === "GET") {
    const allProjects = await db.collection("Profiles").find().toArray();
    res.status(200).json(allProjects);
  }
}
