import "./User.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const User = () => {
  const [data, setData] = useState();
  const url ="http://localhost:9000/viewUser";
  const [result, setResult] = useState();

  const handle = (e) =>{
    setData(e.target.value)
  }

  const Submit = (e) =>{
    e.preventDefault();
    console.log(data)
    axios.post(url, {
      id:data
    }).then((res)=>{
      console.log(res.data)
      setResult(res.data) 
    })
  }

    return (
        <>
            <form className="user-view">
                <label>Enter your ID : </label>
                <input onChange={(e)=>handle(e)} type="number" id="studentId" />
                <button onClick={(e)=>Submit(e)}>Get Result</button>
            </form>
            {result && result.length > 0 && result.map((obj, index) => (
              <div>
              <h1>{obj.firstname} Results</h1>
              <div className="result-box">
              <p>Student ID: {obj.id}</p>
              <p>{obj.subject1}: {obj.marks1}</p>
              <p>{obj.subject2}: {obj.marks2}</p>
              <p>{obj.subject3}: {obj.marks3}</p>
              <p>Total: {obj.total}</p>
              </div>
              </div>
            ))}
        </>
    )
}

export default User
