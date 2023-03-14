import clientPromise from "@/lib/mongodb";

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  if (req.method === "GET") {
    const recommendedProjects = await db
      .collection("Projects")
      .find({ status: "recommended" })
      .toArray();
    res.status(200).json(recommendedProjects);
  }
}
