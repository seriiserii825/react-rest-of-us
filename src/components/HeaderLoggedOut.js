import React, { useState, useContext } from 'react';
import axios from "axios";
import { API_AXIOS_URL } from "../config";
import ExampleContext from "../context/ExampleContext";

function HeaderLoggedOut() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useContext(ExampleContext);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_AXIOS_URL}/login`, { username, password })
      if (response.data) {
        setUsername('')
        setPassword('')
        setLoggedIn(true);
        localStorage.setItem('complexappToken', response.data.token);
        localStorage.setItem('complexappUsername', response.data.username);
        localStorage.setItem('complexappAvatar', "http://gravatar.com/avatar/48cbc7dd0568f6ac661b08776d190150");
      } else {
        console.log(response.data, 'response.data')
      }
    } catch (e) {
      console.log(e, 'e')
    }

  }

  return (
    <form onSubmit={submitHandler} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input value={username} onChange={e => setUsername(e.target.value)} name="username"
                 className="form-control form-control-sm input-dark" type="text"
                 placeholder="Username" autoComplete="off"/>
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input value={password} onChange={e => setPassword(e.target.value)} name="password"
                 className="form-control form-control-sm input-dark" type="password"
                 placeholder="Password"/>
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;