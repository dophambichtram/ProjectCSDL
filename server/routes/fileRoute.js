const express = require("express");
const router = express.Router();
const { v2 } = require("cloudinary");
const multer = require("multer");
const upload = multer();

v2.config({
  api_key: "859192987521754",
  cloud_name: "ddkczxqph",
  api_secret: "QaNxcXYCRaxPNcS4FCmSziXRBIk",
});

// Upload one file
router.post("/1", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    const result = await new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: encodeURIComponent(file.originalname) + "-" + Date.now(),
            folder: "bichtram",
          },

          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(file.buffer);
    });

    res.json({ message: "successfully", url: result.url });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
