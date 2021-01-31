import React, {useEffect, useState} from 'react';
import {HEADINGS} from "./headings";
import DataTable from "./DataTable";
import "./table.css";

function ListPods() {
    const [podDetails, setPodDetails] = useState([]);
    const [row, setRowData] = useState([]);
    const [filter, setFilter] = useState("");


    function handleChange(val) {
        setFilter(val);

        if(val.trim() !== "") {
            const filteredRows = row.filter((r) => r[0].toLowerCase().indexOf(val.toLowerCase()) > -1);
            setRowData(filteredRows);
        }else {
            const result = podDetails.map(({ name, nameSpace, status, age }) => [name, nameSpace, status, age]);
            setRowData(result)
        }
        
    }
  
    useEffect(()=> {
        console.log("===use effect call===");
        fetch("http://localhost:3001/").then(response => response.json())
        .then(data => {
            setPodDetails(data)
            
            const result = data.map(({ name, nameSpace, status, age }) => [name, nameSpace, status, age]);
            setRowData(result)
            
        });
    }, [])

    

    return(
        <div>
            Pods
            <input value = {filter || ""} onChange={e => handleChange(e.target.value)}/>
            
            <DataTable headings={HEADINGS} rows={row} />
        </div>
    )
}

export default ListPods;