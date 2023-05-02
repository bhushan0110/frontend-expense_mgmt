import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    let navigate = useNavigate();
    const [loginDetails,setLoginDetails] = useState({
        email:'',
        password:''
    });
    const handelChange = (e) =>{
        setLoginDetails({...loginDetails,[e.target.name]:e.target.value});
        console.log(loginDetails);
    }

    const submitHandeler = async (e)=>{
        e.preventDefault();
        try{    
            console.log(loginDetails);
            const {email,password} = loginDetails;
            const post = await axios.post('http://localhost:5000/auth/login',{email,password});
            if(post){
                console.log(post.data.authToken);
                localStorage.setItem('jwtToken',post.data.authToken );
                alert('Login success');
                navigate('/expenses');
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="container my-5" style={{display:'flex',alignContent:'center', justifyContent:'center'}}>
            <div className="card" style={{width: "75%"}}>
                <img src="https://th.bing.com/th/id/OIP.Rc20lYXTq2XQYa3yvxaWMgHaD3?w=341&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className="card-img-top" alt="..." style={{maxHeight:'40vH'}}/>
                <div className="card-body">
                <form onSubmit={submitHandeler}>
                    <div className="my-2">
                         <h2>Login</h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handelChange} name="email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={handelChange} name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className="container my-4">
                        <p> New to Expense management <a href="/signup"> Register here </a></p>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;