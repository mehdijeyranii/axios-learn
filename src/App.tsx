import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:5000/api";

const App = () => {
  const [posts, setPosts] = useState<
    | {
        id: number;
        title: string;
        body: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setPosts(res.data.posts);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} className="border-b p-2">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
