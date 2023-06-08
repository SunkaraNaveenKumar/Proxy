const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const user = req.user;
    const id = user._id;
    let subfolder = "";
    if (file.mimetype.startsWith("image/")) {
      subfolder = "images";
    } else if (file.mimetype.startsWith("audio/")) {
      subfolder = "audio";
    } else {
      subfolder = "other";
    }
    const destinationFolder = path.join(
      "public",
      "uploads",
      id.toString(),
      subfolder,
      file.fieldname
    );
    fs.mkdirSync(destinationFolder, { recursive: true });
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname + "-" + uuidv4() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const uploadAccountFiles = (req, res, next) => {
  const uploadMiddleware = multer({
    storage,
  }).fields([
    { name: "adhar", maxCount: 2 },
    { name: "pan", maxCount: 2 },
  ]);

  try {
    uploadMiddleware(req, res, function (err) {
      try {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred during file upload
          throw new Error(err.message);
          // return res.status(400).json({ message: "Multer error: " + err.message });
        } else if (err) {
          // An unknown error occurred during file upload
          throw new Error(err.message);

          // return res.status(500).json({ message: "Error uploading files: " + err.message });
        }
        if (!req.files["adhar"] || req.files["adhar"].length !== 2) {
          throw new Error("Upload both front and back pics of ADHAR");
        }
        if (!req.files["pan"] || req.files["pan"].length !== 2) {
          throw new Error("Upload both front and back pics of PAN");
        }
        // Files uploaded successfully
        next();
        // return res.json({ message: "Files uploaded successfully" });
      } catch (err) {
        res.json({ errors: err.message });
      }
    });
  } catch (err) {
    res.json({ errors: err.message });
  }
};

module.exports = uploadAccountFiles;
