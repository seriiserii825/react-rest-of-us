import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import LoadingDotsIcon from "../components/LoadingDotsIcons";
import { API_AXIOS_URL } from "../config";
import Page from "../layouts/Page";
import FormatDate from "../utils/FormatDate";
import ReactMarkdown from "react-markdown";
import ReactTooltip from "react-tooltip";
import NotFound from "./NotFound";
import StateContext from "../context/StateContext";
import DispatchContext from "../context/DispatchContext";

function ViewSinglePost({ history }) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      async function fetchPost() {
        try {
          const result = await axios.get(`${API_AXIOS_URL}/post/${id}`);
          if (result.data) {
            setPost(result.data);
            if (post.author && post.author.username === appState.user.username) {
              setIsOwner(true);
            }
            setLoading(false);
          } else {
            setNotFound(true);
          }

        } catch (error) {
          console.log(error);
        }
      }

      fetchPost();
    }
    return () => (isMounted = false);
  }, [post, id, appState.user.username]);

  if (notFound) {
    return <NotFound/>
  }

  if (loading) {
    return (
      <Page title="...">
        <LoadingDotsIcon/>
      </Page>
    );
  }

  async function deleteHandler() {
    const areYouSure = window.confirm('Are you sure, you want to delete this post?');
    if (areYouSure) {
      try {
        const response = await axios.delete(`${API_AXIOS_URL}/post/${id}`, {
          data: {
            token: appState.user.token
          }
        });
        if (response.data === "Success") {
          appDispatch({ type: "flashMessage", value: "Post was deleted!!!" });
          history.push(`/profile/${appState.user.username}`);
        }
      } catch (e) {
        console.log(e, 'e')
      }

    }
    return false;
  }

  return (
    <Page title="Single post">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner && (
          <span className="pt-2">
          <Link
            to={`/post/${post._id}/edit`}
            data-tip="Edit"
            data-for="edit"
            className="text-primary mr-2"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <ReactTooltip id="edit"/>
          <button
            className="delete-post-button text-danger"
            data-tip="Delete"
            data-for="delete"
            onClick={deleteHandler}
          >
            <i className="fas fa-trash"></i>
          </button>
          <ReactTooltip id="delete"/>
        </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} alt=""/>
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {FormatDate(post.createdDate)}
      </p>

      <div className="body-content">
        <ReactMarkdown children={post.body}/>
      </div>
    </Page>
  );
}

export default withRouter(ViewSinglePost);
