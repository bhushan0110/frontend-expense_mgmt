import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const Expenses = ()=>{
    let navigate = useNavigate();
    const categoryRecord =[
        {
            name: 'Fuel',
            spend:700,
            budget: 2500
        },
        {
            name: 'Food',
            spend:70,
            budget: 250
        },
        {
            name: 'Hospital',
            spend:700,
            budget: 5000
        },
        {
            name: 'Clothes',
            spend:700,
            budget: 2500
        }
    ];

    // const getData = async ()=>{
    //     try{
    //         const data = await axios.get('http://localhost:5000/query/addExpense');

    //     }
    //     catch(err){
    //         console.log(err);
    //         alert("Some error occured");
    //     }
    // };


    const handelAddCategory =()=>{
        navigate('/addCategory');
    }
    
    const handelAddExpense = () =>{
        navigate('/addExpense');
    }

    return(
        <div className="container my-4">
            <div className="container">
                <div className="conatiner">                    
                    <button type="button" class="btn btn-outline-warning mx-3" onClick={handelAddExpense}>Add Expense</button>
                    <button type="button" class="btn btn-outline-warning mx-3" onClick={handelAddCategory}>Add Category</button>
                </div>
                <h2 className="my-4">Category-Wise Expense</h2>
                <div className="row">
                    {
                        categoryRecord.map((element)=>{
                            return(
                                <div className="col-md-4 my-3">
                                    <CategoryCard name={element.name} amount={element.spend} budget={element.budget} />
                                </div>
                            );
                        })    
                    }                                
                </div>
            </div>
        </div>
    );
}

export default Expenses;