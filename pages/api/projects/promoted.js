import clientPromise from "@/lib/mongodb";

const fetchProjects = async (db, res) => {
  const projects = await db
    .collection("Projects")
    .find({ status: "promoted" })
    .toArray();

  if (projects?.length >= 12) {
    res.status(200).json(projects?.slice(0, 12));
  } else if (projects?.length >= 8) {
    res.status(200).json(projects?.slice(0, 8));
  } else if (projects?.length >= 4) {
    res.status(200).json(projects?.slice(0, 4));
  } else {
    res.status(200).json(projects);
  }
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "GET") {
    await fetchProjects(db, res);
  }
}
