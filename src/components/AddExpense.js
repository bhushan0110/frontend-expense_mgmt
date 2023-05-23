import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from './Loading';

const AddExpense = ()=>{
    const navigate = useNavigate();
    const [availableCat,setAvailable] = useState([]);
    const [selectedCat,setSelectedCat] = useState("");
    const [category,setCategory] = useState("");
    const [info,setInfo] = useState('');
    const [amount,setAmount] = useState(0);
    const [date,setDate] = useState();
    const [clicked,setClicked] = useState(false);
    const [spinner,setSpinner] = useState(false);

    const getCategory = async (e) =>{
        try{
            const token = localStorage.getItem('jwtToken');
            const data = await axios.get('http://localhost:5000/expense/getCategory',{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }});

            if(data.data){
                setAvailable(data.data); 
            } 
        }    
        catch(err){
            console.log(err);
        }
    };

    const handelDate = (e) =>{
        setDate(e.target.value);
    }

    const handelSelect = (e) =>{
        const required = e.target.selectedOptions[0].getAttribute('custom');
        setCategory(required);
        setSelectedCat(e.target.value);
        console.log(category);
    }
    
    const handelInfo = (e) =>{
        setInfo(e.target.value);
        console.log(info);
    }

    const handelAmount = (e) =>{
        setAmount(e.target.value);
        console.log(amount);
    }

    const addNewExpense = async (e)=>{
        e.preventDefault();
        setClicked(true);
        try{    

            if(!(selectedCat==="")&& !(info==="") && (amount>0) && !(date===null)){
                setSpinner(true);
                const token = localStorage.getItem('jwtToken');
                const post = await axios.post('http://localhost:5000/expense/addExpense',{category,info,amount,date},{headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }});
                if(post){
                    console.log(post);
                    setSpinner(false);
                    navigate('/dashboard');
                    alert('Category add success');
                }
                else{
                    alert('Err occured');
                }
            }
            else{
                alert("Please enter appropriate data");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    
    useEffect(()=>{
        getCategory();
    },[]);

    return(
        <div>
            {
                (spinner)&& <Loading/>
            }
            {
                (!spinner)&&<div className="container col-md-6  p-4" >
                    <div className="card">
                        <div className="card-body" style={{padding:'30px'}}>
                            <h3>Add New Expense</h3>
                            <form className="my-2" onSubmit={addNewExpense}>
                                                    
                                <label>
                                    Select Category: 
                                    <select name="availableCate" value={selectedCat} onChange={handelSelect}>
                                        {
                                            availableCat.map((element)=>{
                                                return(
                                                    <option value={element.name} custom={element._id} key={element._id} >{element.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </label>
                                {
                                    (selectedCat==="" && clicked)&&<p className="text-danger">A category must be selected</p>
                                }
                                <div  className="form-text my-2"><a href="/addCategory">Add New Category</a></div>
                                <div className="mb-3" style={{marginTop:'10px'}}>
                                    <label htmlFor="exampleInputPassword1" className="form-label">Information</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" onChange={handelInfo}/>
                                    {
                                        (info==="" && clicked)&&<p className="text-danger">Please give some description aboute expense</p>
                                    }
                                </div>

                                <div className="mb-3" style={{marginTop:'10px'}}>
                                    <label htmlFor="exampleInputPassword1" className="form-label">Select Date</label>
                                    <input className="mx-3" type="date" id="Test_DatetimeLocal" onChange={handelDate}/>
                                    {
                                        (date===null && clicked)&&<p className="text-danger">Select a date</p>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Amount</label>
                                    <input type="Number" className="form-control" id="exampleInputPassword1" onChange={handelAmount}/>
                                    {
                                        (amount===0 && clicked)&&<p className="text-danger">Specify amount</p>
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary">Add Expense</button>
                            </form>    
                        </div>    
                    </div>                    
            </div>}
        </div>
    );
};

export default AddExpense;