import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({
    title, content,
    authorId: req.user.id,
    authorName: req.user.name || "Unknown"
  });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  // only author or admin can update
  if (post.authorId?.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  post.title = req.body.title ?? post.title;
  post.content = req.body.content ?? post.content;
  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.authorId?.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  await post.deleteOne();
  res.json({ message: "Deleted" });
};

export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  const comment = { author: req.user.name || "Anonymous", text: req.body.text };
  post.comments.push(comment);
  await post.save();
  res.status(201).json(post);
};

export const deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  const comment = post.comments.id(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  // optionally check if req.user is author or admin
  comment.remove();
  await post.save();
  res.json(post);
};
