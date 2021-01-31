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
    const [sortedObj, setSortedObj] = React.useState({columnName: "", isSorted: false, isSortedAsc: false});

    function handleSort(colName, colIndex){
        const nextIsSorteObj = {...sortedObj};
        
        if (sortedObj.columnName === "" ||sortedObj.columnName === colName) {
            if(!sortedObj.isSorted) {
                nextIsSorteObj.isSorted = true;
                nextIsSorteObj.isSortedAsc = true;
            } else {
                nextIsSorteObj.isSortedAsc = !nextIsSorteObj.isSortedAsc;
            }
        } else {
            nextIsSorteObj.isSorted = true;
            nextIsSorteObj.isSortedAsc = true;
        }

        setSortedObj({columnName: colName, isSorted: nextIsSorteObj.isSorted, isSortedAsc: nextIsSorteObj.isSortedAsc});
        
        const sortedRowArr = [...row]
        
        if (nextIsSorteObj.isSortedAsc) {
            sortedRowArr.sort((a, b) => (a[colIndex] > b[colIndex]) ? 1 : -1);
        } else{
            sortedRowArr.sort((a, b) => (a[colIndex] > b[colIndex]) ? -1 : 1);
        }
        
        setRowData(sortedRowArr);
    }

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
    }

    useEffect(()=> {
        fetch("http://localhost:8090/api/v1/pods").then(response => {
                console.log("====response===", response);
                response.json()
            });
        fetch("http://localhost:8060/").then(response => response.json())
        .then(data => {
            
           
            data.forEach( pod => pod.age = new Date(pod.age).toString());
            setPodDetails(data)
            
            const result = data.map(({ name, nameSpace, status, age }) => [name, nameSpace, status, age]);
            setRowData(result)
        });
    }, [])

    return(
        <div>
            <h1 className="left">Pods</h1>
            <div className="left">
                <FilterText filter = {filter || ""} columnName = "name" changeHandler={handleChange}/>
                <FilterSelect filer = {filterSelect} changeHandler={handleSelect}/>
            </div>
            
            
            <DataTable headings={HEADINGS} rows={row} sortedObj={sortedObj} changeHandler={handleSort}/>
        </div>
    )
}

export default ListPods;