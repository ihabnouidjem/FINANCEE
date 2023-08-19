import clientPromise from "@/lib/mongodb";

const fetchProjects = async (db, res, categoryName) => {
  const projects = await db
    .collection("Projects")
    .find({
      $and: [
        { category: categoryName },
        { $or: [{ status: "approved" }, { status: "promoted" }] },
      ],
    })
    .toArray();
  res.status(200).json(projects);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  const { categoryName } = req.query;

  if (req.method === "GET") {
    await fetchProjects(db, res, categoryName);
  }
}
