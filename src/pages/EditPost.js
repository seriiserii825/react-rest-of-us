import React, { useEffect, useContext } from "react";
import Page from "../layouts/Page";
import axios from "axios";
import { API_AXIOS_URL } from "../config";
import { withRouter } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "../components/LoadingDotsIcons";
import { useImmerReducer } from "use-immer";
import StateContext from "./../context/StateContext";
import DispatchContext from "./../context/DispatchContext";
import NotFound from "./NotFound";

function EditPost({ history }) {
  const originalState = {
    title: {
      value: "",
      hasError: false,
      message: "Title is empty"
    },
    body: {
      value: "",
      hasError: false,
      message: "Body is empty"
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
    notFound: false
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchData":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      case "titleChange":
        draft.title.value = action.value;
        return;
      case "bodyChange":
        draft.body.value = action.value;
        return;
      case "submitEvent":
        if (!draft.title.hasError && !draft.body.hasError) {
          draft.sendCount++;
        }
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;
      case "saveRequestFinished":
        draft.isSaving = false;
        return;
      case "titleRule":
        draft.title.hasError = action.value.trim() === "";
        return;
      case "bodyRule":
        draft.body.hasError = action.value.trim() === "";
        return;
      case "notFound":
        draft.notFound = true;
        return;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState);
  const AppState = useContext(StateContext);
  const AppDispatch = useContext(DispatchContext);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({ type: "titleRule", value: state.title.value });
    dispatch({ type: "bodyRule", value: state.body.value });
    dispatch({ type: "submitEvent" });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      try {
        const result = await axios.get(`${API_AXIOS_URL}/post/${state.id}`);
        const authorName = result.data.author.username;
        const currenUserName = AppState.user.username;
        if (authorName !== currenUserName) {
          AppDispatch({ type: "flashMessage", value: "You don't have acces to edit this post" })
          history.push('/')
        }
        if (result.data) {
          if (isMounted) {
            dispatch({ type: "fetchData", value: result.data });
          }
        } else {
          dispatch({ type: "notFound" });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();

    return () => (isMounted = false);
  }, [state.id, dispatch, AppDispatch, AppState.user.username, history]);

  useEffect(() => {
    let isMounted = true;
    if (state.sendCount) {
      if (isMounted) {
        dispatch({ type: "saveRequestStarted" });

        async function fetchPost() {
          try {
            await axios.post(`${API_AXIOS_URL}/post/${state.id}/edit`, {
              title: state.title.value,
              body: state.body.value,
              token: AppState.user.token
            });
            AppDispatch({
              type: "flashMessage",
              value: "Post was succesfully updated"
            });

            dispatch({ type: "saveRequestFinished" });
            history.push(`/post/${state.id}`);
          } catch (error) {
            console.log(error);
          }
        }

        fetchPost();
      }
    }
    return () => (isMounted = false);
  }, [
    AppState.user.token,
    dispatch,
    state.body.value,
    state.title.value,
    state.id,
    state.sendCount,
    AppDispatch,
    history
  ]);

  if (state.notFound) {
    return <NotFound/>;
  }

  if (state.isFetching) {
    return (
      <Page title="...">
        <LoadingDotsIcon/>
      </Page>
    );
  }

  return (
    <Page title="Edit post">
      <Link to={`/post/${state.id}`}
            className="text-align-right small font-weight-bold">
        <span> &laquo; Go back to post </span> </Link>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small> Title </small>
          </label> <input value={state.title.value}
                          onChange={(e) => dispatch({ type: "titleChange", value: e.target.value })}
                          onBlur={(e) => dispatch({ type: "titleRule", value: e.target.value })}
                          autoFocus name="title"
                          id="post-title"
                          className="form-control form-control-lg form-control-title"
                          type="text"
                          placeholder=""
                          autoComplete="off"/>
          {state.title.hasError && (
            <div className="alert alert-danger small liveValidateMessage"> {state.title.message} </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small> Body Content </small>
          </label>
          <textarea value={state.body.value} onChange={(e) => dispatch({ type: "bodyChange", value: e.target.value })}
                    onBlur={(e) => dispatch({ type: "bodyRule", value: e.target.value })} name="body"
                    id="post-body"
                    className="body-content tall-textarea form-control"
                    type="text"/>
          {state.body.hasError && (
            <div className="alert alert-danger small liveValidateMessage"> {state.body.message} < /div>
          )}
        </div>
        <button className="btn btn-primary"> Update New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(EditPost);