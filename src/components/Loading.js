import React from "react";
import Spinner from '../Spinner1.gif';

const Loading = () =>{
    return(
        <div className="container my-5 mx-auto" style={{textAlign:'center', alignContent:'center'}}>
            <img src={Spinner} />
        </div>
    );
}

export default Loading;