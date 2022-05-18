import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StateContext from "../Context/StateContext";
import Page from "../Page/Page";
import ProfilePost from "./ProfilePost";

const UserProfile = () => {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: {
      postCount: "",
      folowerCount: "",
      folllowingCount: "",
    },
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchDetatil() {
      try {
        const responce = await Axios.post(`/profile/${username}`, {
          token: appState.user.token,
          cancelToken: ourRequest.token,
        });
        setProfileData(responce.data);
      } catch (error) {
        console.log("There is an error in profile page");
      }
    }
    fetchDetatil();
    return () => {
      ourRequest.cancel();
    };
  }, []);
  return (
    <Page title="profile-screen">
      <h2>
        <img
          className="avatar-small"
          src={profileData.profileAvatar}
          height="50px"
        />
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.folowerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.folllowingCount}
        </a>
      </div>

      <ProfilePost />
    </Page>
  );
};

export default UserProfile;
