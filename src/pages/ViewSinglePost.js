import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDotsIcon from "../components/LoadingDotsIcons";
import { API_AXIOS_URL } from "../config";
import Page from "../layouts/Page";
import FormatDate from "../utils/FormatDate";

function ViewSinglePost(props) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    async function fetchPost() {
      try {
        const result = await axios.get(`${API_AXIOS_URL}/post/${id}`);
        if (isMounted) {
          setPost(result.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();

    return () => (isMounted = false);
  }, [post, id]);

  if (loading) {
    return (
      <Page title="...">
        <LoadingDotsIcon />
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
        on {FormatDate(post.createdDate)}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
}

export default ViewSinglePost;
