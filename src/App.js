import "./App.css";
import StateContext from "./components/Context/StateContext";
import DispatchContext from "./components/Context/DispatchContext";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Aboutus from "./components/About-us/Aboutus";
import Terms from "./components/Terms/Terms";
import UserHome from "./components/Body/UserHome";
import { useState, useReducer } from "react";
import CreatePost from "./components/CreatePost/CreatePost";
import Axios from "axios";
import ViewSinglePost from "./components/ShowPost/ViewSinglePost";
import FlashMessage from "./components/FlashMessage/FlashMessage";
import { useImmerReducer } from "use-immer";
import { Action } from "history";
Axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("ComplexAppToken")),
    flashMessages: [],
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        return
      case "logout":
        draft.loggedIn = false;
        return
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="App">
          <FlashMessage message={state.flashMessages} />
          <Header />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <UserHome /> : <Body />}
            />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
