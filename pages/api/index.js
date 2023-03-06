// import clientPromise from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// export default async function Handler(req, res) {
//   const client = await clientPromise;
//   const db = await client.db("Profiles");
//   if (req.method === "GET") {
//     const global = await db
//       .collection("Global")
//       .findOne({ _id: new ObjectId("63fe0f5ad6ac8f4776f807b4") });
//     const recommendedProjects = await db
//       .collection("Profiles")
//       .find({ status: "recommended" })
//       .toArray();
//     res.status(200).json(recommendedProjects);
//   }
// }
import clientPromise from "@/lib/mongodb";

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");
  if (req.method === "GET") {
    const recommendedProjects = await db
      .collection("Profiles")
      .find({ status: "recommended" })
      .toArray();
    res.status(200).json(recommendedProjects);
  }
}
