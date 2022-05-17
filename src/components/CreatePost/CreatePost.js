import React, { useEffect, useState, useContext } from "react";

import Page from "../Page/Page";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import DispatchContext from "../Context/DispatchContext";
import StateContext from "../Context/StateContext";

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const navigate = useNavigate();
  const appDispacth = useContext(DispatchContext);
  const appState = useContext(StateContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", {
        title,
        body,
        token: appState.user.token,
      });
      // redirect to new post url
      appDispacth({
        type: "flashMessage",
        value: "Congrats you  have successfullly crated post!!!",
      });

      navigate(`/post/${response.data}`);

      console.log("New post was created.", title, body);
    } catch (e) {
      console.log("There was a problem.");
    }
  }

  return (
    <Page title="create-post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
};

export default CreatePost;
