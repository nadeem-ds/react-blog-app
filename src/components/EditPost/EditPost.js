import Axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import DispatchContext from "../Context/DispatchContext";
import StateContext from "../Context/StateContext";
import LoadingDotsIcon from "../Loading/LoadingDotsIcon";
import NotFound from "../NotFound/NotFound";
import Page from "../Page/Page";

const EditPost = () => {
  const appState = useContext(StateContext);
  const appDispacth = useContext(DispatchContext);
  const navigate = useNavigate()

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
    notFound: false,
  };

  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      case "titleChange":
        draft.title.hasError = false;
        draft.title.value = action.value;
        return;
      case "bodyChange":
        draft.body.hasError = false;
        draft.body.value = action.value;
        return;
      case "submitRequest":
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
        if (!action.value.trim()) {
          draft.title.hasError = true;
          draft.title.message = "You must provide title";
        }
        return;
      case "bodyRule":
        if (!action.value.trim()) {
          draft.body.hasError = true;
          draft.body.message = "Body can not be emphty";
        }
      case "notFound":
        draft.notFound = true;
        return;
    }
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initailvalue);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "titleRules", value: state.title.value });
    dispatch({ type: "bodyRule", value: state.body.value });
    dispatch({ type: "submitRequest" });
  };

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPost() {
      try {
        const responce = await Axios.get(`post/${state.id}`, {
          cancelToken: ourRequest.token,
        });
        if (responce.data) {
          dispatch({ type: "fetchComplete", value: responce.data });
          if (appState.user.username != responce.data.author.username) {
            appDispacth({
              type: "flashMessage",
              value: "You do not have permission to edit post",
            });
            //rediect to homapega
            navigate("/")
          }
        } else {
          dispatch({ type: "notFound" });
        }
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

  if (state.notFound) {
    return <NotFound />;
  }

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  return (
    <Page title="edit-post">
      <Link
        className="small font-weight-bold btn btn-primary "
        to={`/post/${state.id}`}
      >
        Got to the post
      </Link>
      <form className="mt-3" onSubmit={submitHandler}>
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
            onBlur={(e) =>
              dispatch({ type: "titleRule", value: e.target.value })
            }
          />
          {state.title.hasError && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.title.message}
            </div>
          )}
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
            onBlur={(e) =>
              dispatch({ type: "bodyRule", value: e.target.value })
            }
          />
          {state.body.hasError && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.body.message}
            </div>
          )}
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          Save Updates
        </button>
      </form>
    </Page>
  );
};

export default EditPost;
