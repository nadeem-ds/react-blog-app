import Axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import DispatchContext from "../Context/DispatchContext";
import StateContext from "../Context/StateContext";

import LoadingDotsIcon from "../Loading/LoadingDotsIcon";
import Page from "../Page/Page";

const ViewSinglePost = () => {
  const appState = useContext(StateContext);
  const appDispacth = useContext(DispatchContext);

  const initailvalue = {
    title: {
      value: "",
      hasError: false,
      message: "",
    },
    body: {
      value: "",
      hasError: false,
      message: "",
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
  };

  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "fetchComplete":
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
      case "submitRequest":
        draft.sendCount++;
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;

      case "saveRequestFinished":
        draft.isSaving = false;
        return;
    }
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initailvalue);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    dispatch({ type: "submitRequest" });
  };

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPost() {
      try {
        const responce = await Axios.get(`post/${state.id}`, {
          cancelToken: ourRequest.token,
        });
        dispatch({ type: "fetchComplete", value: responce.data });
      } catch (error) {
        console.log("there is an big problem while loading the post");
      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  //post edit  use effect
  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" });
      const ourRequest = Axios.CancelToken.source();
      async function fetchPost() {
        try {
          const responce = await Axios.post(
            `post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: appState.user.token,
            },
            {
              cancelToken: ourRequest.token,
            }
          );
          dispatch({ type: "saveRequestFinished" });
          appDispacth({ type: "flashMessage", value: "Post was updated" });
        } catch (error) {
          console.log("there is an big problem while loading the post");
        }
      }
      fetchPost();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.sendCount]);

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  return (
    <Page title="edit-post">
      <form onSubmit={submitHandler}>
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
            value={state.title.value}
            onChange={(e) =>
              dispatch({ type: "titleChange", value: e.target.value })
            }
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
            value={state.body.value}
            onChange={(e) =>
              dispatch({ type: "bodyChange", value: e.target.value })
            }
          />
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          Save Updates
        </button>
      </form>
    </Page>
  );
};

export default ViewSinglePost;
