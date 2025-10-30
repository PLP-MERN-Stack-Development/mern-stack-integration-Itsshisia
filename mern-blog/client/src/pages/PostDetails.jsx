import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, addComment } from "../api/api";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getPost(id).then((res) => setPost(res.data));
  }, [id]);

  const handleComment = async () => {
    await addComment(id, { text: comment });
    setComment("");
    const updated = await getPost(id);
    setPost(updated.data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-2">{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="" className="mt-4 rounded" />}
      <p className="text-sm text-gray-500 mt-2">By {post.author}</p>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold">Comments</h3>
        {post.comments?.map((c, i) => (
          <p key={i} className="text-gray-800">{c.text}</p>
        ))}

        <div className="mt-4 flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="border p-2 flex-1 rounded"
          />
          <button onClick={handleComment} className="bg-blue-600 text-white px-4 rounded">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
