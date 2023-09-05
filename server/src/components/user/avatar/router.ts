import { Router } from "express";
import { uploadFile } from "../../../infra/file-storage";
import multer from "multer";

const router = Router();
const parseFormData = multer();

router.post(
  "/upload-avatar",
  parseFormData.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("multipart/form-data file is required");
    }

    try {
      await uploadFile({
        buffer: req.file.buffer,
        name: req.file.originalname,
        mimetype: req.file.mimetype,
      });

      res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

export default router;
