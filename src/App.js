import "./App.css";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Aboutus from "./components/About-us/Aboutus";
import Terms from "./components/Terms/Terms";
import UserHome from "./components/Body/UserHome";
import { useState } from "react";
import CreatePost from "./components/CreatePost/CreatePost";
import Axios from "axios";
import ViewSinglePost from "./components/ShowPost/ViewSinglePost";
import FlashMessage from "./components/FlashMessage/FlashMessage";
import ExampleContext from "./components/Context/ExampleContext";
Axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [isLogIn, setIsLogIn] = useState(
    Boolean(localStorage.getItem("ComplexAppToken"))
  );

  const [flashMessages, setFlashMessages] = useState([]);

  const addFlashMessage = (msg) => {
    setFlashMessages((prev) => prev.concat(msg));
  };
  return (
    <ExampleContext.Provider value={{addFlashMessage,setIsLogIn}}>
      <div className="App">
        <FlashMessage message={flashMessages} />
        <Header isLogIn={isLogIn}  />
        <Routes>
          <Route path="/" element={isLogIn ? <UserHome /> : <Body />} />
          <Route path="/post/:id" element={<ViewSinglePost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </ExampleContext.Provider>
  );
}

export default App;
