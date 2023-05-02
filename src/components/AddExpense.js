import React,{useState,useEffect} from "react";
import axios from "axios";

const AddExpense = ()=>{
    const [category,setCategory] = useState([]);
    const [expense, setExpense] = useState({
        category:'',
        info:'',
        name:'',
        spend:0,
    });

    const handelChange = (e) =>{
        setExpense({...expense,[e.target.name]:e.target.value});
        console.log(expense);
    }

    const addNewExpense = async (e)=>{
        // e.preventDefault();
        try{    
            const token = localStorage.getItem('jwtToken');
            console.log(expense);
            const {category,info,name,spend} = expense;
            const post = await axios.post('http://localhost:5000/expense/addExpense',{category,info,name,spend},{headers: {
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

    const getCategory = async (e) =>{
        try{
            const token = localStorage.getItem('jwtToken');
            const data = await axios.get('http://localhost:5000/expense/getCategory',{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }});
            if(data){ 
                setCategory(data.data);
            }  
        }    
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getCategory();
    });

    return(
        <div>
            <div className="container col-md-6  p-4" >
                    <h3>Add New Expense</h3>
                    <form className="my-2" onSubmit={addNewExpense}>
                        <label for="exampleDataList" class="form-label">Select Category</label>
                        <input class="form-control" list="fruits" id="fruots" placeholder="Type to search..." onChange={handelChange}/>
                        <datalist id="fruits">

                            {category.map((element)=>{
                                return(
                                    <option value={element.name} />
                                );
                            })}
                        </datalist>
                        <div id="emailHelp" class="form-text my-2"><a href="/addCategory">Add New Expense</a></div>
                        <div class="mb-3" style={{marginTop:'10px'}}>
                            <label for="exampleInputPassword1" class="form-label">Information</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" onChange={handelChange}/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Amount</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" onChange={handelChange}/>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Expense</button>
                    </form>
                    
                </div>
        </div>
    );
};

export default AddExpense;