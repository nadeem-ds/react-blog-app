import "./App.css";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Route,Routes } from "react-router-dom";
import Aboutus from "./components/About-us/Aboutus";
import Terms from "./components/Terms/Terms";

function App() {
  return (
    <div classNameName="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/about-us" element={<Aboutus/>}/>
        <Route path="/terms" element={<Terms/>}/>
      </Routes>
      <Footer/>

     

     
    </div>
  );
}

export default App;
