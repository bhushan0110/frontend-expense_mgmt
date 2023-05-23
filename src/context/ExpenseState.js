import React, {useState} from 'react';
import expenseContext from './expenseContext';
console.log(expenseContext +"Hii");
const ExpenseState = (props) =>{
    const [location,setLocation] = useState('/');
    const [categoryExpenseSummary, setCategoryExpenseSummary] = useState([]);
    const [categoryDetails,setCategoryDetails] = useState([]);

    const locationFun = (location) =>{
        setLocation(location);
    }

    const categoryExpenseFun = (data)=>{
        setCategoryExpenseSummary(data);
    }

    const categoryDetailsFun = (data) =>{
        setCategoryDetails(data);
    }

    return(
        <expenseContext.Provider value={{location, categoryExpenseSummary, categoryDetails, locationFun,categoryDetailsFun,categoryExpenseFun}} >
            {props.childrens}
        </expenseContext.Provider>
    );
}

export default ExpenseState;