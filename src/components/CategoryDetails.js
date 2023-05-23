import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CategoryDetails = () =>{
    const { state } = useLocation();
    const id = state?.id;

    const [catData, setCatData] = useState([]);
    const getData = async () =>{
        try{
            const token = localStorage.getItem('jwtToken');
            const data1 = await axios.post('http://localhost:5000/query/categoryDetails', {id:id},{
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            }); 
            const {data} = data1;
            setCatData(data);
            console.log(catData);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[]);

    return(
        <div className="container my-3">
            <h3 className="my-4"> Category Details</h3>
            {
                (catData.length===0)&&<p className="text-danger">No Expense for this category</p>
            }
            <ol className="list-group list-group-numbered">
                {
                    catData.map((element)=>{
                        const d = new Date(element.date).toLocaleDateString();
                        return(
                            <li className="list-group-item d-flex justify-content-between align-items-start" key={element._id}>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{element.info}</div>
                                    {d}
                                </div>
                                <span className="badge bg-primary rounded-pill">{element.amount}</span>
                            </li>
                        );
                    })    
                }
            </ol>
        </div>
    );
}

export default CategoryDetails;