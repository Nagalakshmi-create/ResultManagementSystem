import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddScore.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const AddScore = () => {
  const navigate = useNavigate();
  const [first, setfirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [sum, setSum] = useState("0");

  const showToastMessage = () => {
    toast.success("Details added successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastMessage1 = () => {
    toast.error("Details are not added !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    let sumInput = 0;
    sumInput = parseInt(first) + parseInt(second) + parseInt(third);
    setSum(sumInput);
  }, [first, second, third]);

  const [sid, setSid] = useState([]);
  const [subject, setSubject] = useState([]);
  const [allData, setAlldata] = useState({
    studentId: "",
    studentSubject1: "",
    studentSubject2: "",
    studentSubject3: "",
    s1: "",
    s2: "",
    s3: "",
    totalMarks: "",
  });

  function submit(e) {
    e.preventDefault()
    axios
      .post("http://localhost:9000/addScore", {
        studentId: allData.studentId,
        studentSubject1: allData.studentSubject1,
        studentSubject2: allData.studentSubject2,
        studentSubject3: allData.studentSubject3,
        totalMarks: sum ? sum : 0,
        s1: allData.s1,
        s2: allData.s2,
        s3: allData.s3,
      })
      .then((res) => {
        console.log(res.data.exists);
        if (res.data.exists == "True") {
          console.log("if");
          showToastMessage();
          navigate("/studentScore")
        }
      });
      
  }

  //api for student-id
  const urlid = "http://localhost:9000/studentId";
  const fetchStudentid = () => {
    fetch(urlid)
      .then((response) => response.json())
      .then((data) => setSid(data));
  };

  useEffect(() => {
    fetchStudentid();
  }, []);

  const handleAll = (e) => {
    const newAlldata = { ...allData };
    newAlldata[e.target.id] = e.target.value;
    setAlldata(newAlldata);
    console.log(newAlldata);
  };

  //api for student-subject
  const urlsubject = "http://localhost:9000/studentSubjects";
  const fetchStudentsubjects = () => {
    fetch(urlsubject)
      .then((response) => response.json())
      .then((data) => setSubject(data));
  };

  useEffect(() => {
    fetchStudentsubjects();
  }, []);

  return (
    <>
      <Sidebar />
      <div id="add-score" className="addScore-box">
        <h1 className="score-heading">Add Score</h1>
        <hr></hr>
        <form onSubmit={(e) => submit(e)}>
          {/* select student ID from student_details table */}
          <label className="options">Select student ID: </label>
          <select
            required
            id="studentId"
            onChange={(e) => {
              handleAll(e);
            }}
          >
            <option selected="true" disabled="disabled">
              Select student ID
            </option>
            {sid &&
              sid.length > 0 &&
              sid.map((obj, index) => <option value={obj.id}>{obj.id}</option>)}
          </select>{" "}
          <br></br>
          {/* Selecting student-Subjects from subjects table */}
          <div>
            <label className="subjects">Select Subjects: </label>
            <select
              required
              id="studentSubject1"
              onChange={(e) => {
                handleAll(e);
              }}
            >
              <option selected="true" disabled="disabled">
                Select subject
              </option>
              {subject &&
                subject.length > 0 &&
                subject.map((obj, index) => (
                  <option id={obj.id} value={obj.subjects}>
                    {obj.subjects}
                  </option>
                ))}
            </select>{" "}
            <input
              type="number"
              id="s1"
              value={first}
              onChange={(e) => {
                {
                  setfirst(e.target.value);
                  handleAll(e);
                }
              }}
              className="score-box"
              required
            />
          </div>
          {/* <br></br> */}
          <div>
            <label className="subjects">Select Subjects: </label>
            <select
              required
              id="studentSubject2"
              onChange={(e) => {
                handleAll(e);
              }}
            >
              <option selected="true" disabled="disabled">
                Select subject
              </option>
              {subject &&
                subject.length > 0 &&
                subject.map((obj, index) => (
                  <option id={obj.id} value={obj.subjects}>
                    {obj.subjects}
                  </option>
                ))}
            </select>{" "}
            <input
              type="number"
              id="s2"
              value={second}
              onChange={(e) => {
                {
                  setSecond(e.target.value);
                  handleAll(e);
                }
              }}
              className="score-box"
              required
            />
          </div>
          <div>
            <label className="subjects">Select Subjects: </label>
            <select
              required
              id="studentSubject3"
              onChange={(e) => {
                handleAll(e);
              }}
            >
              <option selected="true" disabled="disabled">
                Select Subject
              </option>
              {subject &&
                subject.length > 0 &&
                subject.map((obj, index) => (
                  <option id={obj.id} value={obj.subjects}>
                    {obj.subjects}
                  </option>
                ))}
            </select>{" "}
            <input
              type="number"
              id="s3"
              value={third}
              onChange={(e) => {
                {
                  setThird(e.target.value);
                  handleAll(e);
                }
              }}
              className="score-box"
              required
            />
          </div>
          <label className="total">Total:</label>{" "}
          <span
            id="totalMarks"
            onChange={(e) => {
              handleAll(e);
            }}
          >
            {" "}
            {sum}
          </span>
          <br></br>
          <button type="submit" className="addScore-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddScore;
