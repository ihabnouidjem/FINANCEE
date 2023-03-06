import clientPromise from "@/lib/mongodb";
import { promises as fs } from "fs";
import path, { resolve } from "path";

export default async function Handler(req, res) {
  const { profileId } = await req.query;

  const client = await clientPromise;
  const db = await client.db("Profiles");

  const profile = await db.collection("Profiles").findOne({ id: profileId });
  // .catch(async (err) => {
  //   fs.mkdir(path.join(process.cwd() + `/public/projects`, `${profileId}`));

  //   const profileInfo = {
  //     email: `${req.body.email}`,
  //     name: `${req.body.name}`,
  //     id: `${req.body.id}`,
  //     profileImg: `${req.body.profileImg}`,
  //     likes: 0,
  //     views: 0,
  //     raised: 0,
  //     donators: 0,
  //     status: "processing",
  //     statusMSG: {
  //       status: true,
  //       type: "status",
  //       subject: "CONGRATULATIONS!",
  //       msg: "You've finally joined the FINANCEE familly. please the fields bellow fields, and rais money for your start-up",
  //       details:
  //         "you need to at least fill the name,category,image, and description fields. after that your project will be eather approved or declined for having mistakes. please make sure you filled the forms correctly.",
  //     },
  //   };
  //   const newProfile = await db.collection("Profiles").insertOne(profileInfo);
  // });

  if (!profile) {
    fs.mkdir(path.join(process.cwd() + `/public/projects`, `${profileId}`));
    const profileInfo = {
      email: `${req.body.email}`,
      name: `${req.body.name}`,
      id: `${req.body.id}`,
      profileImg: `${req.body.profileImg}`,
      likes: 0,
      views: 0,
      raised: 0,
      donators: 0,
      status: "processing",
      statusChanged: false,
      statusMSG: {
        status: true,
        type: "status",
        subject: "CONGRATULATIONS!",
        msg: "You've finally joined the FINANCEE family. please fill in the fields down below, and start raising money for your start-up",
        details:
          "You need to have at least a name and a description for your account to be approved. after filling them your project will either get approved or declined for having mistakes. please make sure you filled out the forms correctly.",
      },
    };
    const newProfile = await db.collection("Profiles").insertOne(profileInfo);
  }
  if (
    profile &&
    profile.status === "processing" &&
    profile.header &&
    profile.description
  ) {
    const updateStatus = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
      {
        $set: { status: "pending", statusChanged: true },
        $currentDate: { lastUpdated: true },
      }
    );
  }
  if (profile && profile.status === "pending" && profile.statusChanged) {
    const updateStatusMSG = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
      {
        $set: {
          statusChanged: false,
          statusMSG: {
            status: true,
            type: "status",
            subject: "PROJECT PENDING!",
            msg: "Your project is waiting for approval.",
            details:
              "please wait untill we check your informations, your profile will be approved or declined based on many criteria.",
          },
        },
        $currentDate: { lastUpdated: true },
      }
    );
  }
  if (profile && profile.status === "recommended" && profile.statusChanged) {
    const updateStatusMSG = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
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
  if (profile && profile.status === "approved" && profile.statusChanged) {
    const updateStatusMSG = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
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
  if (profile && profile.status === "declined" && profile.statusChanged) {
    const updateStatusMSG = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
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
  if (profile && profile.status === "blocked" && profile.statusChanged) {
    const updateStatusMSG = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
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

  // if (req.method === "POST") {
  // const profile = await db.collection("Profiles").findOne({ id: profileId });
  if (req.method === "POST" || req.method === "GET") {
    const Profile = await db.collection("Profiles").findOne({ id: profileId });
    res.json(Profile);
  }

  // }

  if (req.method === "PUT" || req.method === "UPDATE") {
    // const profile = await db.collection("Profiles").findOne({ id: profileId });

    const msg = { msg: "profile updated" };
    const item = await req.body.item;

    const updateProfile = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
      {
        $set: item,
        $currentDate: { lastUpdated: true },
      }
    );

    res.json(msg);
  }
  if (req.method === "DELETE") {
    const item = req.body.item;
    const profile = await db.collection("Profiles").updateOne(
      { id: `${profileId}` },
      {
        $set: item,
        $currentDate: { lastUpdated: true },
      }
    );
    res.json({ msg: "item updated/added" });
  }
}
