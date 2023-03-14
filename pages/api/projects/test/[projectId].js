import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const statusChanged = async (project, projectId) => {
  // if (
  //   project &&
  //   project.status === "processing" &&
  //   project.projectName &&
  //   project.description
  // ) {
  //   const updateStatus = await db.collection("Projects").updateOne(
  //     { _id: `${projectId}` },
  //     {
  //       $set: { status: "pending", statusChanged: true },
  //       $currentDate: { lastUpdated: true },
  //     }
  //   );
  // }
  // if (project && project.status === "pending" && project.statusChanged) {
  //   const updateStatusMSG = await db.collection("Projects").updateOne(
  //     { _id: `${projectId}` },
  //     {
  //       $set: {
  //         statusChanged: false,
  //         statusMSG: {
  //           status: true,
  //           type: "status",
  //           subject: "PROJECT PENDING!",
  //           msg: "Your project is waiting for approval.",
  //           details:
  //             "please wait untill we check your informations, your profile will be approved or declined based on many criteria.",
  //         },
  //       },
  //       $currentDate: { lastUpdated: true },
  //     }
  //   );
  // }
  if (project && project.status === "recommended" && project.statusChanged) {
    const updateStatusMSG = await db.collection("Projects").updateOne(
      { _id: `${projectId}` },
      {
        $set: {
          statusChanged: false,
          statusMSG: {
            status: true,
            type: "status",
            subject: "CONGRATULATIONS!",
            msg: "Great job, you've come this far... your project is now promoted.",
            details:
              "A promoted project will appear in pretty much every where in the website...",
          },
        },
        $currentDate: { lastUpdated: true },
      }
    );
  }
  if (project && project.status === "approved" && project.statusChanged) {
    const updateStatusMSG = await db.collection("Projects").updateOne(
      { _id: `${projectId}` },
      {
        $set: {
          statusChanged: false,
          statusMSG: {
            status: true,
            type: "status",
            subject: "PROJECT APPROVED!",
            msg: "Congratulation, now you can see your project on the projects page.",
            details:
              "feel free to fill all your fields and who knows maybe we promote your profile",
          },
        },
        $currentDate: { lastUpdated: true },
      }
    );
  }
  if (project && project.status === "declined" && project.statusChanged) {
    const updateStatusMSG = await db.collection("Projects").updateOne(
      { _id: `${projectId}` },
      {
        $set: {
          statusChanged: false,
          statusMSG: {
            status: true,
            type: "status",
            subject: "OOPS, PROJECT DECLINED!",
            msg: "Please check your project informations, may be there are some mistakes.",
            details:
              "A declined project won't appear on the projects page, therefore changing your project informations is necessary. we will gladly check your profile again for approval.",
          },
        },
        $currentDate: { lastUpdated: true },
      }
    );
  }
  if (project && project.status === "blocked" && project.statusChanged) {
    const updateStatusMSG = await db.collection("Projects").updateOne(
      { _id: `${projectId}` },
      {
        $set: {
          statusChanged: false,
          statusMSG: {
            status: true,
            type: "status",
            subject: "OOPS, PROJECT BLOCKED!",
            msg: "Your project have been blocked due to misterious activity, it will be recovered in a few days.",
            details:
              "A blocked project won't appear in the projects page and you won't be able to gain access to it. but once we unblock you all your data will be accessible. contact us for more info.",
          },
        },
        $currentDate: { lastUpdated: true },
      }
    );
  }
};

export default async function Handler(req, res) {
  const { projectId } = await req.query;
  const client = await clientPromise;
  const db = await client.db("Profiles");

  const project = await db.collection("Projects").findOne({ _id: projectId });
  statusChanged(project, projectId);

  if (req.method === "GET") {
    const project = await db
      .collection("Projects")
      .findOne({ _id: new ObjectId(projectId) });
    res.status(200).json(project);
  }

  if (req.method === "PUT" || req.method === "UPDATE") {
    const msg = { msg: "project updated" };
    const item = await req.body.item;
    const updateProject = await db.collection("Projects").updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: item,
        $currentDate: { lastUpdated: true },
      }
    );

    res.json(msg);
  }
}
