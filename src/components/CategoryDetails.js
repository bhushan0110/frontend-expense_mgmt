import React from "react";

const CategoryDetails = () =>{
    const arr = [
        {
            amount: 1000,
            Info: 'Ajcnwnv vjlksa n lkjv sdklclajck jmsv;lkjsdnpodx',
            date: '2023-10-12'
        },
        {
            amount: 1000,
            Info: 'Ajcnwnv vjlksa n lkjv sdklclajck jmsv;lkjsdnpodx',
            date: '2023-10-12'
        },
        {
            amount: 1000,
            Info: 'Ajcnwnv vjlksa n lkjv sdklclajck jmsv;lkjsdnpodx',
            date: '2023-10-12'
        },
        {
            amount: 1000,
            Info: 'Ajcnwnv vjlksa n lkjv sdklclajck jmsv;lkjsdnpodx',
            date: '2023-10-12'
        }
    ]
    
    return(
        <div className="container my-4" style={{alignContent:'center', justifyContent:'center'}}>
            <h1>Category</h1>
            <ol class="list-group list-group-numbered" style={{width:'70%', marginTop:'20px'}}>
                {
                    arr.map((elements)=>{
                        return(
                            <li class="list-group-item d-flex justify-content-between align-items-start my-2">
                                <div class="ms-2 me-auto">
                                <div class="fw-bold">{elements.date}</div>
                                {elements.Info}
                                </div>
                                <span class="badge bg-primary rounded-pill">{elements.amount}</span>
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
};

export default CategoryDetails;

                 