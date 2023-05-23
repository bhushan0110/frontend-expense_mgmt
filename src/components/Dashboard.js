import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import image from '../profile.png';
import Charts from 'react-apexcharts';
import Loading from "./Loading";

const Dashboard = () =>{
    const [categoryRecord, setCategory] = useState([]);
    const [recentExpense,setRecentExpense] = useState([]);
    const [monthly,setMonthly] = useState({});
    const [refresh,setRefresh] = useState(false);
    const [userNm,setUser] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [pieName,setPieName] = useState([]);
    const [pieValue,setPieValue] = useState([]);
    const [spinner,setSpinner] = useState(true);

    const getData = async()=>{
        try{
            const token = localStorage.getItem('jwtToken');
            const ans =await axios.get('http://localhost:5000/query/dashboardData',{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }});
            if(!ans){
                alert("Data Not Found")
            }
            console.log(ans);
            const {data} = ans;
            const {recentItems,category,totalBudget,spend,extra,user,pieNm,pieVal} = data;
            setCategory(category);
            const arr1=[],arr2=[];
            categoryRecord.map((element) =>{
                arr1.push(element.name);
                arr2.push(element.spend);
            })
            setPieName(pieNm); setPieValue(pieVal);
            setRecentExpense(recentItems);
            setMonthly({
                budget:totalBudget,
                spend: spend,
                extra: extra
            });
            setUser(user.name);
            setUserEmail(user.email);
            setSpinner(false);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    },[])

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date();

    return (
        <>
        {(spinner)&&<Loading/>}
        {(!spinner)&&<div className="container my-2" >
            <div className="container row my-4">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-4" style={{justifyContent:'center', textAlign:'center'}}>
                            <img  src={image} alt="" style={{width: '100%',maxWidth:'12rem'}}/>
                        </div> 
                        <div className="col-md-8 my-5">
                            <h3>Hello {userNm}</h3>
                            <p>Email: {userEmail}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card" style={{width: '100%'}}>
                        <div className="row">
                            <div className="card-body col-md-4 mx-1">
                                <h5 className="card-title">Monthly Summary</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{months[date.getMonth()]} {date.getFullYear()}</h6>
                                <div className="container my-3">
                                    <p>Budget: {monthly.budget}</p>
                                    <p>Spend:{monthly.spend}</p>
                                    {
                                        (monthly.extra>0)&&<p className="text-danger">Extra: {monthly.extra}</p>  
                                    }
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4"/>           
            </div>

            <div className="row">
                <div className="col-md-6"> 
                    <h4>Recent Expenses</h4>
                    <div className="container" style={{alignContent:'center', justifyContent:'center'}}>
                        <ol className="list-group list-group-numbered" style={{width:'70%', marginTop:'20px'}}>
                            {
                                recentExpense.map((element)=>{
                                    const date = new Date(element.date);
                                    const elementDate=date.toLocaleDateString();
                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-start my-2">
                                            <div className="ms-2 me-auto">
                                            <div className="fw-bold">{element.info}</div>
                                                {
                                                    date.toLocaleString(new Date(elementDate))
                                                }
                                            </div>
                                            <span className="badge bg-primary rounded-pill">{element.amount}</span>
                                        </li>
                                    );
                                })
                            }

                        </ol>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Category wise summary</h4>
                    <Charts
                        type="donut"
                        series={pieValue}
                        width={360}
                        height={360}
                        options={{
                            labels: pieName
                        }}
                    />
                </div>
                <hr className="my-4"/>
            </div>

            <div className="row">
                <h4>Category-Wise Expenses</h4>
                {
                        categoryRecord.map((element)=>{
                            return(
                                <div className="col-md-4 my-3" key={element._id}>
                                    <CategoryCard name={element.name} amount={element.spend} budget={element.budget} id={element._id} refresh={refresh} setRefresh={setRefresh}/>
                                </div>
                            );
                        })    
                    }   
            </div>
        </div>
        }
        </>
    );
};

export default Dashboard;