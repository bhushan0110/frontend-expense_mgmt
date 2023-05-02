import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import Expenses from "./Expenses";
import CategoryDetails from "./CategoryDetails";
import AddCategory from "./AddCategory";
import AddExpense from "./AddExpense";

function Home() {
  return (
    <Router>
        <div className="container"> 
          <Routes>
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/expenses" element={<Expenses/>}></Route>
            <Route exact path="/categoryDetails" element={<CategoryDetails/>}></Route>
            <Route exact path="/addExpense" element={<AddExpense/>}></Route>
            <Route exact path="/addCategory" element={<AddCategory/>}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default Home;
