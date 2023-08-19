import clientPromise from "@/lib/mongodb";

const newProject = async (db, body, res) => {};

const fetchProjects = async (db, res) => {
  const projects = await db
    .collection("Projects")
    .find({})
    .sort({ lastUpdated: -1 })
    .toArray();
  res.status(200).json(projects);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const body = await req.body;

  if (req.method === "POST") {
    await newProject(db, body, res);
  }

  if (req.method === "GET") {
    await fetchProjects(db, res);
  }
}
