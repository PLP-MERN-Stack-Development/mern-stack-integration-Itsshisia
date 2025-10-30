import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/api"; // adjust path if needed
import { motion } from "framer-motion";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">📝 All Blog Posts</h1>
        <Link
          to="/create"
          className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all shadow-lg"
        >
          + Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-300 text-lg">No posts yet. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post._id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-purple-400">{post.title}</h2>
              <p className="text-sm mb-2 text-gray-400">By {post.author}</p>
              <p className="text-gray-300">{post.content.slice(0, 100)}...</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
