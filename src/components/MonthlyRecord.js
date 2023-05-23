import axios from "axios";
import React, { useEffect, useState } from "react";

const MonthlyRecord = ()=>{
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
    const [record, setRecord] = useState([]);

    function getCurrentMonth() {
        const curr = new Date();
        const year = curr.getFullYear();
        const month = curr.getMonth() + 1;
        return `${year}-${month.toString().padStart(2, '0')}`;
    }

    const handelChange = (e)=>{
        setSelectedMonth(e.target.value);
    }

    const handelClick = () =>{
        getData();
    }

    const getData = async () => {
        try{
            const token = localStorage.getItem('jwtToken');
            const data = await axios.post('http://localhost:5000/query/monthlyRecord',{date:selectedMonth},{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }});
            setRecord(data.data);
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[]);

    return (
        <div className="container">
            <div className="container my-4">
                <h5>Select Month</h5>
                <input type="month" value={selectedMonth} className="form-control" onChange={handelChange} style={{width:'18rem'}}/>
                <button type="button" className="btn btn-outline-info my-2" onClick={handelClick}>Search</button>
            </div>
            <div className="container my-3">
                {
                    (record.length===0)&&<p className="text-danger">No Expense for this Month</p>
                }
                <ol className="list-group list-group-numbered">
                    {
                        record.map((element)=>{
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
        </div>
    );
}

export default MonthlyRecord;