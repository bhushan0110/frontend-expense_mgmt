import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = (props) =>{
    const navigate = useNavigate();
    const {name,amount,budget,id} = props;
    const handelClick = async()=>{
        try{
            navigate('/categoryDetails', { state: { id: id} });
        }
        catch(err){
            console.log(err);
        }
    }

    const del = async () =>{
        try{
            const token = localStorage.getItem('jwtToken');
            const delet = await axios.post('http://localhost:5000/query/deleteCategory',{catID:id},{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }});

            if(delet){
                alert("Deleted");
                props.setRefresh(!props.refresh);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="card" style={{width:'18rem'}} >
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Budget: {budget}</h6>
                <p className="card-text">Spent: <strong>{amount}</strong></p>
                {
                    (budget<amount)&&
                    <p class="text-danger">Extra Spent:{amount-budget}</p>
                }
                <button type="button" class="btn btn-outline-info btn-sm" onClick={handelClick}>More Details</button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={del} style={{marginLeft:'10px'}}>Delete</button>
            </div>
        </div>
    );
};

export default CategoryCard;