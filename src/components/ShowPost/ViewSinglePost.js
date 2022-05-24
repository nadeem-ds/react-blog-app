import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "../Loading/LoadingDotsIcon";
import Page from "../Page/Page";

const ViewSinglePost = () => {
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
  }, []);

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

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <Link
            to={`/post/${post._id}/edit`}
            className="text-primary mr-2"
            title="Edit"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
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
