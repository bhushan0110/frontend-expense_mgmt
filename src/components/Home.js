import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import CategoryDetails from "./CategoryDetails";
import AddCategory from "./AddCategory";
import AddExpense from "./AddExpense";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import MonthlyRecord from "./MonthlyRecord";
import Navbar from "./Navbar";
import CustomTimeRecord from "./CustomTimeRecord";
import Loading from "./Loading";

function Home() {
  return (
    <Router>
        <Navbar/>
        <div className="container"> 
          <Routes>
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/categoryDetails" element={<CategoryDetails/>}></Route>
            <Route exact path="/addExpense" element={<AddExpense/>}></Route>
            <Route exact path="/addCategory" element={<AddCategory/>}></Route>
            <Route exact path='/forgotPassword' element={<ForgotPassword/>}></Route>
            <Route exact path='/resetPass' element={<ResetPassword/>}></Route>
            <Route exact path='/dashboard' element={<Dashboard/>}></Route>
            <Route exact path='/transactions' element={<Transaction/>}></Route>
            <Route exact path='/monthlyTransaction' element={<MonthlyRecord/>}></Route>
            <Route exact path='/customTime' element={<CustomTimeRecord/>}></Route>
            <Route exact path='/spinner' element={<Loading/>}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default Home;
