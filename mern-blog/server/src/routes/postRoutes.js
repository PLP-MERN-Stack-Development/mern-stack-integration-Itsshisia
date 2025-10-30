import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import Post from "../models/Post.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/:id/image", auth, upload.single("image"), async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.imageUrl = `/uploads/${req.file.filename}`;
  await post.save();
  res.json(post);
});

export default router;
