import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const ResetPassword = () =>{

    const navigate = useNavigate();

    const [password,setPassword] = useState("");
    const [confPassword,setConfPassword] = useState("");
    const [match,setMatch] = useState(true);
    const [clicked,setClicked] = useState(false);
    const [spinner,setSpinner] = useState(false);


    const handelPass = (e) =>{
        setPassword(e.target.value);
        if(password===confPassword){
            setMatch(true);
        }else{
            setMatch(false);
        }
        console.log(match);
    }

    const handelConf = (e) =>{
        setConfPassword(e.target.value);
        if(password===confPassword){
            setMatch(true);
        }else{
            setMatch(false);
        }
        console.log(match);
    }

    const handelClick = async () =>{
        setClicked(true);
        try{
            if(password===confPassword && password.length>=5){
                setSpinner(true);
                const token = localStorage.getItem('jwtToken');
                const reset = await axios.post('http://localhost:5000/auth/resetPassword',{password},{headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }});

                if(reset){
                    setSpinner(false);
                    navigate('/dashboard');  
                    alert("Password changed successfully");                  
                }
            }
            else{
                setMatch(false);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
            {
                (spinner)&&<Loading/>
            }
            {
                (!spinner)&&<div className="container my-4" style={{width:'80%'}}>
                    <div className="card">
                        <div className="card-body">
                            <h4>Reset Password</h4>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handelPass}/>
                                {
                                    (password==="")&&(clicked)&&<p className="text-danger">Password must be min 5 character long</p>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handelConf}/>
                                {
                                    (confPassword==="")&&(clicked)&&<p className="text-danger">Password must be min 5 character long</p>
                                }
                            </div>
                            {
                                (!match)&&<p className="text-danger"></p>
                            }
                            <button type="button" className="btn btn-outline-info" onClick={handelClick}>Reset</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ResetPassword;