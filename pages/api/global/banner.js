import clientPromise from "@/lib/mongodb";

const getBanner = async (db, res) => {
  const promoted = db
    .collection("Projects")
    .find({ status: "promoted" })
    .toArray();
  const advertisements = db.collection("Advertisements").find().toArray();

  let banner = [];
  await Promise.all([promoted, advertisements]).then(async (values) => {
    let i = 0;
    banner = await values[1].map((obj) => {
      return { ...obj, type: "advertisement" };
    });
    await values[0].map((obj) => {
      banner.push({ ...obj, type: "project" });
    });
  });
  res.status(200).json(banner);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  if (req.method === "GET") {
    await getBanner(db, res);
  }
}
