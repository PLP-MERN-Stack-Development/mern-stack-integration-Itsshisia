import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../api/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>

      {token && (
        <button
          onClick={() => navigate("/posts/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        >
          + Create New Post
        </button>
      )}

      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => navigate(`/posts/${post._id}`)}
          className="border-b py-4 cursor-pointer hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.author}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
