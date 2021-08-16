import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import DispatchContext from "../context/DispatchContext";
import StateContext from "../context/StateContext";
import { AVATAR } from "../config";

function HeaderLoggedIn({ history }) {
  const AppDispatch = useContext(DispatchContext);
  const AppState = useContext(StateContext);

  function handleLogin() {
    AppDispatch({ type: "logout" });
    history.push('/');
  }

  function openSearch(){
    AppDispatch({type: "openSearch"});
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <button onClick={openSearch} className="text-white mr-2 header-search-icon no-button">
        <i className="fas fa-search"/>
      </button>
      <span className="mr-2 header-chat-icon text-white">
            <i className="fas fa-comment"/>
            <span className="chat-count-badge text-white"> </span>
          </span>
      <Link to={`/profile/${AppState.user.username}`} className="mr-2 no-button">
        <img className="small-header-avatar" src={AVATAR} alt=""/>
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogin} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default withRouter(HeaderLoggedIn);