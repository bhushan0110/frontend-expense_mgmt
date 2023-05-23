import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){
    let navigate = useNavigate();
    const [signupDetails,setSignUpDetails] = useState({
        email:'',
        password:'',
        name:'',
    });
    
    const handelName = (e) =>{
        e.preventDefault();
        setSignUpDetails({
            email:signupDetails.email,
            password:signupDetails.password,
            name:e.target.value
        })
        console.log(signupDetails)
    }

    const handelEmail = (e) =>{
        e.preventDefault();
        setSignUpDetails({
            name:signupDetails.name,
            password:signupDetails.password,
            email:e.target.value
        })
        console.log(signupDetails)
    }

    const handelPassword = (e) =>{
        e.preventDefault();
        setSignUpDetails({
            name:signupDetails.name,
            email:signupDetails.email,
            password:e.target.value,
        })
        console.log(signupDetails)
    }
    
    const submitHandeler = async (e)=>{
        e.preventDefault();
        try{    
            const {name,email,password} = signupDetails;
            const post = await axios.post('http://localhost:5000/auth/createUser',{name,email,password});
            if(post){
                alert('New user created');
                navigate('/dashboard');
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="container my-5" style={{display:'flex',alignContent:'center', justifyContent:'center'}}>
            <div className="card" style={{width: "75%"}}>
                <img src="https://th.bing.com/th/id/OIP.UhYCBFrw4HTXX7sHwxoBHQHaDa?w=322&h=161&c=7&r=0&o=5&dpr=1.5&pid=1.7" className="card-img-top" alt="..." style={{maxHeight:'40vH'}}/>
                <div className="card-body">
                <form  onSubmit={submitHandeler}>
                    <div className="my-2">
                         <h2>SignUp</h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="userName"  onChange={handelName} name="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handelEmail} name="email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={handelPassword} name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;