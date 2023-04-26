import React, { useState } from "react";

function Login(){
    const [loginDetails,setLoginDetails] = useState({
        email:'',
        password:''
    });
    const handelChange = (e) =>{
        setLoginDetails({...loginDetails,[e.target.name]:e.target.value});
        console.log(loginDetails);
    }

    return (
        <div className="container my-5" style={{display:'flex',alignContent:'center', justifyContent:'center'}}>
            <div className="card" style={{width: "75%"}}>
                <img src="https://th.bing.com/th/id/OIP.Rc20lYXTq2XQYa3yvxaWMgHaD3?w=341&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className="card-img-top" alt="..." style={{maxHeight:'40vH'}}/>
                <div className="card-body">
                <form>
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
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;