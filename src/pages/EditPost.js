import React, { useEffect } from "react";
import Page from "../layouts/Page";
import axios from "axios";
import { API_AXIOS_URL } from "../config";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoadingDotsIcon from "../components/LoadingDotsIcons";
import { useImmerReducer } from "use-immer";

function EditPost({ history }) {
  const originalState = {
    title: {
      value: "",
      hasError: false,
      message: ""
    },
    body: {
      value: "",
      hasError: false,
      message: ""
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchData":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      default:
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, originalState);

  useEffect(() => {
    let isMounted = true;
    async function fetchPost() {
      try {
        const result = await axios.get(`${API_AXIOS_URL}/post/${state.id}`);
        if (isMounted) {
          dispatch({ type: "fetchData", value: result.data });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();

    return () => (isMounted = false);
  }, [state.id, dispatch]);

  if (state.isFetching) {
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  }

  return (
    <Page title="Edit post">
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            value={state.title.value}
            onChange={(e) => console.log(e, "j")}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            value={state.body.value}
            onChange={(e) => console.log(e, "e")}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          />
        </div>
        <button className="btn btn-primary">Update New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(EditPost);
