import React from 'react';
import 'bulma/css/bulma.min.css';
import '../css/style.css';

const Pagination = ({ previous, next }) => {

    return (
        <nav className='pagination'>
            <a onClick={previous} className="pagination-previous">Previous</a>
            <a onClick={next} className="pagination-next">Next page</a>
        </nav>
    );
};

export default Pagination;