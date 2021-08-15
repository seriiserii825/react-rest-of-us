import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_AXIOS_URL } from "../config";
import LoadingDotsIcon from "./LoadingDotsIcons";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  function postDate(date) {
    const newDate = new Date(date);
    return `${newDate.getDay()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchPosts() {
      const response = await axios.get(
        `${API_AXIOS_URL}/profile/${username}/posts`
      );
      if (isMounted) {
        setPosts(response.data);
        setLoading(false);
      }
    }
    fetchPosts();
    return () => (isMounted = false);
  }, [username]);

  if (loading) {
    return <LoadingDotsIcon />;
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
          <span className="text-muted small">
            {" "}
            on {postDate(post.createdDate)}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
