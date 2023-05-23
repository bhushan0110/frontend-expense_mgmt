import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar (){
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const handel = async () =>{
        try{
            const Logout = await axios.post('http://localhost:5000/auth/logout');
            if(Logout){
                localStorage.removeItem('jwtToken');
                console.log(Logout);
                navigate('/');
            }
        }
        catch(err){
            console.log(err);
        }
    };

    const handelDashboard = () =>{
        navigate('/dashboard');
    }

    const handelReset = () =>{
        navigate('/resetPass')
    }
    const handelAddExpense = () =>{
        navigate('/addExpense');
    }

    const handelMonthly = () =>{
        navigate('/monthlyTransaction');
    }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/dashboard">Expense Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            (location.pathname!=="/" && location.pathname!=="/forgotPassword" && location.pathname!=="/signup")&&
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item my-2" style={{marginRight:'8px'}}>
                                    <button type="button" style={{color:'white'}} className="btn " onClick={handelDashboard}>Dashboard</button>
                                </li>
                                <li className="nav-item my-2" style={{marginRight:'8px'}}>
                                    <button type="button" style={{color:'white'}} className="btn " onClick={handelAddExpense}>Add Expense</button>
                                </li>
                                <li className="nav-item my-2" style={{marginRight:'8px'}}>
                                    <button type="button" style={{color:'white'}} className="btn" onClick={handelMonthly}>Monthly Expense</button>
                                </li>
                                <li className="nav-item my-2" style={{marginRight:'8px'}}>
                                    <button type="button" className="btn text-info-emphasis" onClick={handelReset}>Reset Password</button>
                                </li>
                                <li className="nav-item my-2">
                                    <button type="button" className="btn text-info-emphasis" onClick={handel}>Logout</button>
                                </li>
                            </ul>
                        }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;