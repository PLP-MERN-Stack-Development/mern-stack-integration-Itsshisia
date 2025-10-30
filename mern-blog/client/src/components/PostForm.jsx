import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PostForm({ initial, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });

  useEffect(() => {
    if (initial) setFormData(initial);
  }, [initial]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500"
    >
      <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 drop-shadow-lg">
        {initial ? "Edit Post ✏️" : "Write Your Story ✨"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-pink-200 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="w-full p-3 bg-white/20 text-white placeholder-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 border border-white/30"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-purple-200 font-semibold mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full p-3 bg-white/20 text-white placeholder-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/30"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-blue-200 font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content..."
            rows="6"
            className="w-full p-3 bg-white/20 text-white placeholder-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/30 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-blue-500 hover:to-pink-500 transition-all duration-300"
        >
          {initial ? "Update Post ✏️" : "Publish Post 🚀"}
        </motion.button>
      </form>
    </motion.div>
  );
}
