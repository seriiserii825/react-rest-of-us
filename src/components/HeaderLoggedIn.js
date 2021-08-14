import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import {withRouter} from "react-router-dom";
import DispatchContext from "../context/DispatchContext";

function HeaderLoggedIn({history}) {
  const AppDispatch = useContext(DispatchContext);
  const [avatar, setAvatar] = useState('');

  function handleLogin() {
    AppDispatch({type: "logout"});
    localStorage.removeItem('complexappToken');
    localStorage.removeItem('complexappUsername');
    localStorage.removeItem('complexappAvatar');
    history.push('/');
  }

  useEffect(() => {
    setAvatar(localStorage.getItem('complexappAvatar'));
  }, []);

  return (
    <div className="flex-row my-3 my-md-0">
      <button className="text-white mr-2 header-search-icon no-button">
        <i className="fas fa-search"></i>
      </button>
      <span className="mr-2 header-chat-icon text-white">
            <i className="fas fa-comment"></i>
            <span className="chat-count-badge text-white"> </span>
          </span>
      <button className="mr-2 no-button">
        <img className="small-header-avatar" src={avatar}
             alt=""/>
      </button>
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