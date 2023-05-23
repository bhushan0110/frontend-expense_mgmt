import axios from "axios";
import React, { useState } from "react";

const Transaction = () => {
    const [data,setData] = useState([]);

    const handelSubmit = async ()=>{
        try{
            const token = localStorage.getItem('jwtToken');
            const getData = await axios.get('/customTimeRecord',{headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }});
            console.log(getData);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="container">
            <div>
                <h3>Transaction</h3>
                <hr />
                <h5>Select duration</h5>
                <div className="container" style={{ width: '70%' }}>
                    <form onSubmit={handelSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Start Date</label>
                            <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">End Date</label>
                            <input type="date" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            {
                (data.length>0)&&(
                    <div className="row">
                        <h4>Record</h4>
                        {
                            data.map((elements)=>{
                                return(
                                    <div className="col-md-4">
                                        {elements}
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Transaction;