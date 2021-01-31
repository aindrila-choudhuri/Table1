import React, {useEffect, useState} from 'react';
import {HEADINGS} from "./headings";
import DataTable from "./DataTable";
import "./table.css";
import FilterText from "./FilterText";
import FilterSelect from "./FilterSelect";
import {STATUS} from "./headings";

function ListPods() {
    const [podDetails, setPodDetails] = useState([]);
    const [row, setRowData] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterSelect, setFilterSelect] = useState("");

    function handleChange(val, colName) {
        setFilter(val);

        let filteredPod = podDetails
        if(val.trim() !== "") {
            filteredPod = podDetails.filter((pod) => pod[colName].toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        const result = filteredPod.map(({ name, nameSpace, status, age }) => [name, nameSpace, status, age]);
        setRowData(result)
    }

    function handleSelect(val) {
        setFilterSelect(val);
        let filteredPod = podDetails
        if(val.trim() !== "" && val.toLowerCase() !== STATUS[0].toLowerCase()) {
            filteredPod = podDetails.filter((pod) => {
                return pod.status.toLowerCase() === val.toLowerCase()
            });
        }
        const result = filteredPod.map(({ name, nameSpace, status, age }) => [name, nameSpace, status, age]);
        setRowData(result);
        sortData("name");
    }

    function sortData(colName){
        const sortedPod = [...podDetails].sort((a, b) => (a[colName] > b[colName]) ? 1 : -1);
        console.log("==sortedPod==", sortedPod);
        console.log("==podDetails==", podDetails);
        const result = sortedPod.map(({ name, nameSpace, status, age }) => [name, nameSpace, status, age]);
        console.log("==result==", result);
        //setRowData(result);
    }

    useEffect(()=> {
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
            <FilterText filter = {filter || ""} columnName = "name" changeHandler={handleChange}/>
            <FilterSelect filer = {filterSelect} changeHandler={handleSelect}/>
            <DataTable headings={HEADINGS} rows={row} />
        </div>
    )
}

export default ListPods;