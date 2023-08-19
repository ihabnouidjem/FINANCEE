import clientPromise from "@/lib/mongodb";

const fetchTransactions = async (db, transacId, res) => {
  const transactions = await db
    .collection("Transactions")
    .find({ uid: transacId })
    .toArray();
  res.status(200).json(transactions);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const body = await req.body;
  const { transacId } = await req.query;

  if (req.method === "GET") {
    await fetchTransactions(db, transacId, res);
  }
}
