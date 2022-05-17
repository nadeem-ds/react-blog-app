import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

const ProfilePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const responce = await Axios.get(`profile/${username}/posts`);
        setPosts(responce.data);
        setIsLoading(false);
      } catch (error) {
        console.log("there is an big problem");
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="list-group">
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return (
          <Link
            key={post._id}
            to={`post/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img
              className="avatar-tiny"
              src={post.author.avatar}
              height="50px"
            />
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small">on {formattedDate} </span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfilePost;
