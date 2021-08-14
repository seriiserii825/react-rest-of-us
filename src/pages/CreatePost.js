import React, { useState } from 'react';
import Page from "../layouts/Page";
import axios from "axios";
import { API_AXIOS_URL } from "../config";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    await axios.post(`${API_AXIOS_URL}/create-post`, {
      title,
      body,
      token: localStorage.getItem('complexappToken')
    })
    setTitle('');
    setBody('');
  }

  return (
    <Page title="Create post">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus name="title" id="post-title"
                 className="form-control form-control-lg form-control-title"
                 type="text" placeholder="" autoComplete="off"/>
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea value={body} onChange={e => setBody(e.target.value)} name="body" id="post-body"
                    className="body-content tall-textarea form-control"
                    type="text"/>
        </div>
        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default CreatePost;