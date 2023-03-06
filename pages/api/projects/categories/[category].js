import clientPromise from "@/lib/mongodb";

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  const { category } = await req.query;
  if (req.method === "GET" || req.method === "POST") {
    const categoryProjects = await db
      .collection("Profiles")
      .find({ category: `${category}` })
      .toArray();
    res.status(200).json(categoryProjects);
  }
}
