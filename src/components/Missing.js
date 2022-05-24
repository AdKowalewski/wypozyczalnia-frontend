import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

const Missing = () => {
    return (
        <article>
            <br/>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <Link to="/">Visit Our Homepage</Link>
        </article>
    );
};

export default Missing;