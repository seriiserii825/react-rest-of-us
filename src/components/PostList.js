import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_AXIOS_URL } from "../config";
import LoadingDotsIcon from "./LoadingDotsIcons";
import FormatDate from "./../utils/FormatDate";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    let isMounted = true;
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `${API_AXIOS_URL}/profile/${username}/posts`
        );
        if (isMounted) {
          setPosts(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
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
            on {FormatDate(post.createdDate)}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
