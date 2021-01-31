import React from 'react';
import {STATUS} from "./headings";

const FilterSelect = (props) => {
    const makeItem = ((status,idx) => <option key={idx}>{status}</option>);

    return <select value={props.filterSelect} onChange={(e) => props.changeHandler(e.target.value)}>{STATUS.map(makeItem)}</select>;
}

export default FilterSelect;