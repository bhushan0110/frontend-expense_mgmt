import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Login from "./Login";
import Signup from "./Signup";

function Home() {
  return (
    <Router>
      <div className="container"> 
        <Routes>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
