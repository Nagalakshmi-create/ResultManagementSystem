import "./User.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import img from "../components/idcard.png";

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
      if (res.data.length == 0){
      alert('this Student ID not Found')
      }
      setResult(res.data) 
    })
  }

  function newResult(){
    setData()
    setResult()
  }

    return (
        <>
        <div className="banner-card">
        <img src={img} className="idcard-img" />
        </div>
        <form className="user-view">
        <label>Enter your ID : </label>
        <input onChange={(e)=>handle(e)} type="number" id="studentId" />
         <button onClick={(e)=>Submit(e)} id="student-submit">Get Result</button>
       
     </form>
          
          
            {result && result.length > 0 && result.map((obj, index) => (
              <div>
             
              <div id="result-box">
              <p><span className="name-tag">Student Name:</span> {obj.firstname}</p>
             
              <p><span className="name-tag">{obj.subject1}:</span> {obj.marks1}</p>
              <p><span className="name-tag">{obj.subject2}:</span> {obj.marks2}</p>
              <p><span className="name-tag">{obj.subject3}:</span> {obj.marks3}</p>
              <p><span className="name-tag">Total</span>: {obj.total}</p>

             
              </div>
              {/* <button onClick={newResult} id="new-result">New Result</button> */}
              </div>
              
            ))}
        </>
    )
}

export default User
