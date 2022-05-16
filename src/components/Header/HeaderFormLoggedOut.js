import React, { useState, useContext } from "react";
import Axios from "axios";
import ExampleContext from "../Context/ExampleContext";
import DispatchContext from "../Context/DispatchContext";


const HeaderFormLoggedOut = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const appDispacth  = useContext(DispatchContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/login", {
        username,
        password,
      });
      if (response.data) {
        console.log(response.data);
        localStorage.setItem("ComplexAppToken", response.data.token);
        localStorage.setItem("ComplexAppUserName", response.data.username);
        localStorage.setItem("ComplexAppAvatar", response.data.avatar);
        appDispacth({type:"Login"})
      } else {
        console.log("Incorrect username / password.");
      }
    } catch (e) {
      console.log("There was a problem with axios block.", e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
        <div className="row align-items-center">
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              name="username"
              className="form-control form-control-sm input-dark"
              type="text"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              name="password"
              className="form-control form-control-sm input-dark"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-auto">
            <button className="btn btn-success btn-sm">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeaderFormLoggedOut;
