import clientPromise from "@/lib/mongodb";

const fetchProjects = async (db, res, searchName) => {
  const projects = await db
    .collection("Projects")
    .find({
      $and: [
        { name: searchName },
        { $or: [{ status: "approved" }, { status: "promoted" }] },
      ],
    })
    .toArray();
  res.status(200).json(projects);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  const { searchName } = req.query;

  if (req.method === "GET") {
    await fetchProjects(db, res, searchName);
  }
}
