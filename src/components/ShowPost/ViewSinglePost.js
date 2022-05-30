import Axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import DispatchContext from "../Context/DispatchContext";
import StateContext from "../Context/StateContext";
import LoadingDotsIcon from "../Loading/LoadingDotsIcon";
import NotFound from "../NotFound/NotFound";

import Page from "../Page/Page";

const ViewSinglePost = () => {
  const navigate = useNavigate();
  const appState = useContext(StateContext);
  const appDispacth = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPost() {
      try {
        const responce = await Axios.get(`post/${id}`, {
          cancelToken: ourRequest.token,
        });
        setPost(responce.data);
        setIsLoading(false);
      } catch (error) {
        console.log("there is an big problem while loading the post");
      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [id]);

  if (!isLoading && !post) {
    return <NotFound />;
  }

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  const date = new Date(post.createdDate);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const isOwner = () => {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username;
    }
    return false;
  };
  const deleteHanlder = async () => {
    const sure = window.confirm("Do you want to delete this post!!");
    if (sure) {
      try {
        const responce = await Axios.delete(`/post/${id}`, {
          data: {
            token: appState.user.token,
          },
        });
        if (responce.data == "Success") {
          // 1. dispaly a flash msg
          appDispacth({
            type: "flashMessage",
            value: "Post was successfully deleted",
          });
          //2. redirect back to current user home page
          navigate(`/profile/${appState.user.username}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {/* condition for original author */}
        {isOwner() && (
          <span className="pt-2">
            {/* edit button */}
            <Link
              to={`/post/${post._id}/edit`}
              className="text-primary mr-2"
              data-tip="edit"
              title="Edit"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip id="edit" className="custom-tooltip" />
            {/* delete button */}
            <a
              onClick={deleteHanlder}
              className="delete-post-button text-danger"
              title="Delete"
            >
              <i className="fas fa-trash"></i>
            </a>
            <ReactTooltip id="delete" className="custom-tooltip" />
          </span>
        )}
      </div>
      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} height="40px" />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on{formattedDate}
      </p>
      <div className="body-content">{post.body}</div>
    </Page>
  );
};

export default ViewSinglePost;
