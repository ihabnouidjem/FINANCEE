import clientPromise from "@/lib/mongodb";
import { IncomingForm } from "formidable";
import { access, promises as fs } from "fs";
import path, { resolve } from "path";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

const addImagePathname = async (db, imageId, files, fields) => {
  console.log(imageId, files, fields);
  let imageName = await files.img.originalFilename;
  let directory = await fields.path;
  // let imagePathname = path.join(`${directory}`, `${imageId}`, `${pathname}`);
  await db
    .collection("Profiles")
    .updateOne(
      { id: `${imageId}` },
      {
        $set: { projectImg: `${directory}/${imageId}/${imageName}` },
        $currentDate: { lastUpdated: true },
      }
    )
    .then(() => {
      console.log("img path added");
    })
    .catch((err) => {
      return err;
    });
};

const createNewImage = async (imageId, files, fields) => {
  let directory = await fields.path;
  // await fs.mkdir(path.join(process.cwd() + `${directory}`, `${imageId}`));
  let fileName = await files.img?.originalFilename;
  let oldPath = await files.img?.filepath;
  let newPath = `./public/projects/${imageId}/${fileName}`;
  mv(`${oldPath}`, `${newPath}`, (err) => {
    return err;
  });
};

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = await client.db("Profiles");

  var { imageId } = await req.query;

  if (req.method === "POST") {
    try {
      const form = new IncomingForm();
      // var newProductId = Date.now();
      const data = new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          // console.log(files.img, fields);
          addImagePathname(db, imageId, files, fields);
          createNewImage(imageId, files, fields);
        });
      });
      res.status(200).json({ data: "success" });
    } catch (err) {
      console.log(err);
    }
  }
}
