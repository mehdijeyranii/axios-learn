import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:5000";

interface Post {
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Post[]>(`${baseURL}/posts`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  const createPost = () => {
    axios
      .post<Post>(`${baseURL}/posts`, {
        title: "Hello World!",
        body: "This is a new post",
      })
      .then((res) => {
        setPosts((prevPosts) => [...prevPosts, res.data]);
      })
      .catch((error) => {
        console.error("Error creating post:", error.response?.data || error.message);
      });
  };

  if (loading) {
    return <p className="text-gray-500">Loading posts...</p>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={createPost}
      >
        Create Post
      </button>
    </div>
  );
};

export default App;
