import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomTimeRecord = () => {
    const [start,setStart] = useState(new Date().toISOString().split('T')[0]);
    const [end,setEnd] = useState(new Date().toISOString().split('T')[0]);

    const [record,setRecord] = useState([]);

    const handelStart = (e) =>{
        setStart(e.target.value);
        console.log(start);
    }

    const handelEnd = (e) =>{
        setEnd(e.target.value);
        console.log(end);
    }

    const handelClick = () =>{
        getData();
    }

    const getData = async () =>{
        try{
            const token = localStorage.getItem('jwtToken');
            const ans =await axios.post('http://localhost:5000/query/customRecord',{data:{start:start,end:end}},{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }});
            setRecord(ans.data);
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        // console.log('UseEffect');
    },[])

    return(
        <div className="row my-4 mx-auto">
            <div className="container col-md-6 my-4">
                <div className="card mx-auto" style={{width: '20rem'}}>
                    <div className="card-body">
                        <h5>Select Start Date:</h5>
                        <input type="date" name="start" id="start" value={start} onChange={handelStart} />
                        
                        <h5 className="my-2">Select Ending Date:</h5>
                        <input type="date" name="start" id="start" value={end} onChange={handelEnd}/>
                        <br />
                        <button type="button" className="btn btn-outline-info my-3" onClick={handelClick}>Search</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6 my-4">
                <div className="">
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
        </div>
    );
};

export default CustomTimeRecord;