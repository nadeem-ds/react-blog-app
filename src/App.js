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
Axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [isLogIn, setIsLogIn] = useState(
    Boolean(localStorage.getItem("ComplexAppToken"))
  );
  return (
    <div className="App">
      <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
      <Routes>
        <Route path="/" element={isLogIn ? <UserHome /> : <Body />} />
        <Route path="/post/:id" element={<ViewSinglePost/>}/>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
