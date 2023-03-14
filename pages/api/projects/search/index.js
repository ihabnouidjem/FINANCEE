import clientPromise from "@/lib/mongodb";

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  if (req.method === "GET" || req.method === "POST") {
    const projectsFilter = await req.body;
    const allProjects = await db
      .collection("Projects")
      .find(projectsFilter)
      .toArray();
    res.status(200).json(allProjects);
  }
}
