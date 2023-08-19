import clientPromise from "@/lib/mongodb";

const newTransaction = async (db, body, res) => {
  const transactions = await db.collection("Transactions").insertOne(body);
  res.status(200).json(transactions);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const body = await req.body;

  if (req.method === "POST") {
    await newTransaction(db, body, res);
  }
}
