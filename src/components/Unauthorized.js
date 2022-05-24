import React from "react";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <section>
            <br/>
            <h1 style={{fontWeight: 'bold', color: 'red'}}>Unauthorized</h1>
            <br/>
            <p>You do not have access to the requested page!</p>
            <br/>
            <a onClick={goBack}>Go Back</a>
        </section>
    );
};

export default Unauthorized;