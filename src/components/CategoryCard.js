import React from "react";

const CategoryCard = (props) =>{
    const {name,amount,budget} = props;
    return(
        <div className="card" style={{width:'18rem'}} >
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Budget: {budget}</h6>
                <p className="card-text">Spent: <strong>{amount}</strong></p>
                <a href="/categoryDetails" className="card-link">More Details</a>
            </div>
        </div>
    );
};

export default CategoryCard;