import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AddCategory = () =>{
    const navigate = useNavigate();
    const [clicked,setClicked] = useState(false);
    const [category, setCategory] = useState({
        name:'',
        budget:0,
    });
    const [spinner,setSpinner] = useState(false);

    const handelChange = (e) =>{
        setCategory({...category,[e.target.name]:e.target.value});
        console.log(category);
    }

    const addNewCategory = async (e)=>{
        e.preventDefault();
        setClicked(true);
        try{    
            if(!(category.name==='') && (category.budget>0)){
                setSpinner(true);
                const token = localStorage.getItem('jwtToken');
                console.log(category);
                const {name,budget} = category;
                const post = await axios.post('http://localhost:5000/expense/addCategory',{name,budget},{headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }});
                if(post){
                    console.log(post);
                    setSpinner(false);
                    navigate('/dashboard');
                    alert('Category add success');
                }
            }
            else{
                alert("Please enter details correctly");
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
                (!spinner)&&<div className="container col-md-6 p-4">
                    <h3>Add New Category</h3>
                    <form onSubmit={addNewCategory}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" name="name" onChange={handelChange}/>
                            {
                                (category.name==="" && clicked)&&<p className="text-danger">Please give some description aboute expense</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Budget</label>
                            <input type="number" className="form-control" id="exampleInputPassword1" name="budget" onChange={handelChange}/>
                            {
                                (category.budget===0 && clicked)&&<p className="text-danger">Please give some description aboute expense</p>
                            }
                        </div>
                        <button type="submit" className="btn btn-primary">Add Category</button>
                    </form>
                </div>
            }
        </>
    );
};

export default AddCategory;