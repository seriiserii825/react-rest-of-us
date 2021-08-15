import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_AXIOS_URL } from "../config";
import Page from "../layouts/Page";

function ViewSinglePost(props) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  function postDate(date) {
    const newDate = new Date(date);
    return `${newDate.getDay()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchPost() {
      const result = await axios.get(`${API_AXIOS_URL}/post/${id}`);
      if (isMounted) {
        setPost(result.data);
        setLoading(false);
      }
    }
    fetchPost();

    return () => (isMounted = false);
  }, [post, id]);

  if (loading) {
    return (
      <Page title="...">
        <h3>Loading....</h3>
      </Page>
    );
  }

  return (
    <Page title="Single post">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="/some" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a
            href="/edit"
            className="delete-post-button text-danger"
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} alt="" />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {postDate(post.createdDate)}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
}

export default ViewSinglePost;
