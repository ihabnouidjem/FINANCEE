import clientPromise from "@/lib/mongodb";

const addNewProject = async (db, body) => {
  const projectBody = {
    uid: `${body.uid}`,
    projectName: `${body.projectName}`,
    description: `${body.description}`,
    amount: `${body.amount}`,
    likes: 0,
    views: 0,
    raised: 0,
    donators: 0,
    // status: "processing",
    status: "pending",
    statusChanged: false,
    // statusMSG: {
    //   status: true,
    //   type: "status",
    //   subject: "CONGRATULATIONS!",
    //   msg: "You've finally joined the FINANCEE family. please fill in the fields down below, and start raising money for your start-up",
    //   details:
    //     "You need to have at least a name and a description for your account to be approved. after filling them your project will either get approved or declined for having mistakes. please make sure you filled out the forms correctly.",
    // },
    statusMSG: {
      status: true,
      type: "status",
      subject: "PROJECT PENDING!",
      msg: "Your project is waiting for approval.",
      details:
        "please wait untill we check your informations, your profile will be approved or declined based on many criteria.",
    },
  };

  const newProject = await db.collection("Projects").insertOne(projectBody);

  const profile = await db.collection("Profiles").findOne({ id: body.uid });

  let newProjects = [];
  if (profile.projects) {
    newProjects = await profile.projects;
    await newProjects.push({
      insertedID: newProject?.insertedId,
      uname: `${body.uname}`,
      projectName: `${body.projectName}`,
      description: `${body.description}`,
      amount: `${body.amount}`,
    });
  } else {
    newProjects = [newProject];
  }
  const updateProfile = await db.collection("Profiles").updateOne(
    { id: body.uid },
    {
      $set: { projects: newProjects },
      $currentDate: { lastUpdated: true },
    }
  );
};

export default async function Handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const body = await req.body;

  if (req.method === "POST") {
    addNewProject(db, body);
    res.status(200).json({ msg: "project added" });
  }

  if (req.method === "GET") {
    const allProjects = await db.collection("Projects").find().toArray();
    res.status(200).json(allProjects);
  }
}
