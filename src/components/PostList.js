import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_AXIOS_URL } from "../config";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get(
        `${API_AXIOS_URL}/profile/${username}/posts`
      );
      setPosts(response.data);
      setLoading(false);
    }
    fetchPosts();
  }, [username]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="list-group">
      {posts.map((post) => (
        <Link
          key={post._id}
          to={`/post/${post._id}`}
          className="list-group-item list-group-item-action"
        >
          <img
            className="avatar-tiny"
            src={post.author.avatar}
            alt={post.title}
          />
          <strong>{post.title}</strong>
          <span className="text-muted small"> on 2/10/2020</span>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
