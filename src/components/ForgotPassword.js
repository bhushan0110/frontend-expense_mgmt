import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () =>{
    let navigate = useNavigate();
    const [email,setEmail] = useState();

    const handelSubmit = async (e) =>{
        e.preventDefault();
        try{
            const success = await axios.post('http://localhost:5000/auth/forgotPassword',{email});
            if(success){
                console.log(success);
                alert('Check you email for new password');
                navigate('/');
            }
        }   
        catch(err){
            const {response} =err;
            const {status} = response;
            if(status===400){
                alert('Email not Registered');
                navigate('/');
            }
            console.log(response);
        }
    }

    const handelChange = (e) =>{
        setEmail(e.target.value);
    }

    return(
        <div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handelChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;