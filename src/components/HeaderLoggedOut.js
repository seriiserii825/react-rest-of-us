import React, { useState } from 'react';
import axios from "axios";

function HeaderLoggedOut({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { username, password })
      if (response.data) {
        setUsername('')
        setPassword('')
        setLoggedIn(true);
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