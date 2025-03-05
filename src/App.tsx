import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts/176";

function App() {
  const [post, setPost] = useState<{ title: string; body: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPost(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && (
        <p className="max-w-2xl p-5 text-rose-500 bg-rose-100 rounded-md fixed bottom-2 right-2">
          {error}
          <span className="absolute bottom-0 right-0 h-1 w-0 bg-rose-500 animate-progress"></span>
        </p>
      )}
      {post && (
        <div>
          <h1 className="text-lg font-bold">{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;
