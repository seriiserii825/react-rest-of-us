import React, { useEffect, useContext, useState } from "react";
import Page from "../layouts/Page";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_AXIOS_URL } from "../config";
import StateContext from "../context/StateContext";
import PostList from "../components/PostList";

function Profile(props) {
  const { username } = useParams();
  const AppState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    profileUsername: "....",
    counts: {
      postCount: "",
      followerCount: "",
      followingCount: ""
    }
  });

  useEffect(() => {
    async function getProfile() {
      const response = await axios.post(
        `${API_AXIOS_URL}/profile/${username}`,
        {
          token: AppState.user.token
        }
      );
      setProfileData(response.data);
    }

    getProfile();
  }, [username, AppState.user.token]);

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} alt="" />{" "}
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <PostList />
    </Page>
  );
}

export default Profile;
