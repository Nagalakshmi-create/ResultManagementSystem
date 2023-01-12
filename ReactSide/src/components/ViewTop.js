import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import moment from "moment";
import axios from "axios";
import Form from "react-bootstrap/Form";
import './ViewTop.css';

const ViewTop = () => {
    const [topEEE,setTopEEE] = useState([]);
    const [topCSE,setTopCSE] = useState([]);
    const [topIT,setTopIT] = useState([]);

    const fetchData = () => {
        return fetch("http://localhost:9000/toplistEEE")
          .then((response) => response.json())
          .then((data) => setTopEEE(data));
      };
      useEffect(() => {
        fetchData();
      }, []);

     

      const fetchData1 = () => {
          return fetch("http://localhost:9000/toplistCSE")
            .then((response) => response.json())
            .then((data) => setTopCSE(data));
        };
        useEffect(() => {
          fetchData1();
        }, []);
  
  
        

        const fetchData2 = () => {
            return fetch("http://localhost:9000/toplistIT")
              .then((response) => response.json())
              .then((data) => setTopIT(data));
          };
          useEffect(() => {
            fetchData2();
          }, []);

          return (
            <>
                <Sidebar/>
                <div className="top-table">
                <table className="table table-bordered shadow-lg">
                <thead className="table-dark">
                        <tr>
                          <th>Student ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Course</th>
                          <th>Total Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topEEE && topEEE.length > 0 && topEEE.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.id}</td>
                                <td className="status-font">{obj.firstname}</td>
                                <td className="status-font">{obj.lastname}</td>
                                <td className="status-font">{obj.course_name}</td>
                                <td className="status-font">{obj.total}</td>
                            </tr>
                        ))}
                      </tbody>
                </table>
                </div>

                    {/* // FOR CSE table */}
                <div className="top-table">
                <table className="table table-bordered shadow-lg">
                <thead className="table-dark">
                        <tr>
                          <th>Student ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Course</th>
                          <th>Total Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topCSE && topCSE.length > 0 && topCSE.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.id}</td>
                                <td className="status-font">{obj.firstname}</td>
                                <td className="status-font">{obj.lastname}</td>
                                <td className="status-font">{obj.course_name}</td>
                                <td className="status-font">{obj.total}</td>
                            </tr>
                        ))}
                      </tbody>
                </table>
                </div>

                    {/* // FOR IT table */}
                    <div className="top-table">
                <table className="table table-bordered shadow-lg">
                <thead className="table-dark">
                        <tr>
                          <th>Student ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Course</th>
                          <th>Total Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topIT && topIT.length > 0 && topIT.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.id}</td>
                                <td className="status-font">{obj.firstname}</td>
                                <td className="status-font">{obj.lastname}</td>
                                <td className="status-font">{obj.course_name}</td>
                                <td className="status-font">{obj.total}</td>
                            </tr>
                        ))}
                      </tbody>
                </table>
                </div>


                

        
        
        
            </>
          )
        }
        export default ViewTop;
    






































































  