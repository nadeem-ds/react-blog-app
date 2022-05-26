import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../Context/DispatchContext";
import StateContext from "../Context/StateContext";

const HeaderLoggedIn = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const loggedOut = () => {
    appDispatch({ type: "Logout" });
  };
const handleSearchIcon = (e) =>{
  e.preventDefault()
  appDispatch({type:"openSearch"})
}
  return (
    <div className="flex-row my-3 my-md-0">
      <a onClick={handleSearchIcon} href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img
          className="small-header-avatar"
          src={appState.user.avatar}
          alt="my pic"
          height="50px"
        />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={loggedOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
};

export default HeaderLoggedIn;
