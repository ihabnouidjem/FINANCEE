import clientPromise from "@/lib/mongodb";

const newProject = async (db, body, res) => {
  const project = {
    uid: body.uid,
    uname: body.uname,
    uemail: body.uemail,
    uimage: body.uimage,
    name: body.name,
    description: body.description,
    amount: body.amount,
    views: 0,
    likes: 0,
    donators: 0,
    raised: 0,
    status: "pending",
    statusChanged: true,
    statusMSG: {
      status: true,
      type: "status",
      subject: "PROJECT PENDING!",
      msg: "Your project is waiting for approval.",
      details:
        "please wait untill we check your informations, your profile will be approved or declined based on many criteria.",
    },
  };

  const projects = await db.collection("Projects").insertOne(project);
  res.status(200).json(projects);
};

const fetchProjects = async (db, res) => {
  const projects = await db
    .collection("Projects")
    .find({ $or: [{ status: "approved" }, { status: "promoted" }] })
    .toArray();
  res.status(200).json(projects);
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const body = await req.body;

  if (req.method === "POST") {
    await newProject(db, body, res);
  }

  if (req.method === "GET") {
    await fetchProjects(db, res);
  }
}
