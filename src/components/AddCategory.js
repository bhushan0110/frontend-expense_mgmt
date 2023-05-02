import React, {useState} from "react";
import axios from "axios";

const AddCategory = () =>{
    const [category, setCategory] = useState({
        name:'',
        budget:0,
    });

    const handelChange = (e) =>{
        setCategory({...category,[e.target.name]:e.target.value});
        console.log(category);
    }

    const addNewCategory = async (e)=>{
        e.preventDefault();
        try{    
            const token = localStorage.getItem('jwtToken');
            console.log(category);
            const {name,budget} = category;
            const post = await axios.post('http://localhost:5000/expense/addCategory',{name,budget},{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
              }});
            if(post){
                console.log(post);
                alert('Category add success');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className="container col-md-6 p-4">
            <h3>Add New Category</h3>
            <form onSubmit={addNewCategory}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" name="name" onChange={handelChange}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Budget</label>
                    <input type="number" class="form-control" id="exampleInputPassword1" name="budget" onChange={handelChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;