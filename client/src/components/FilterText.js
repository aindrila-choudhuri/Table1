import React from 'react';

const FilterText = (props) => {
    return(
        <span>
            Search: {" "}
            <input value = {props.filter} onChange={e => props.changeHandler(e.target.value, props.columnName)}/>
        </span>
    )
}

export default FilterText;