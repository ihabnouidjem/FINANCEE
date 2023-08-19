import clientPromise from "@/lib/mongodb";

const fetchCategories = async (db, res) => {
  const categories = await db
    .collection("Categories")
    .find({ status: "true" })
    .toArray();
  res.status(200).json(categories);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "GET") {
    await fetchCategories(db, res);
  }
}
