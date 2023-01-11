import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddStudent.css";
import Sidebar from "./Sidebar";

const AddStudent = () => {
  const [course, setCourse] = useState([]);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    YOJ: "",
    DOB: "",
    Address: "",
    BloodGroup: "",
    course: "",
  });

  const showToastMessage = () => {
    toast.success("Details added successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastMessage1 = () => {
    toast.error("Details not added !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const url = "http://localhost:9000/addstudent";
  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        fname: data.fname,
        lname: data.lname,
        YOJ: data.YOJ,
        DOB: data.DOB,
        course: data.course,
        Address: data.Address,
        BloodGroup: data.BloodGroup,
      })
      .then((res) => {
        console.log(res.data.exists);
        if (res.data.exists == "True") {
          showToastMessage();
        } else {
          showToastMessage1();
        }
      });
  }

  //api for courses
  const urlCourse = "http://localhost:9000/courses";
  const fetchCourse = () => {
    fetch(urlCourse)
      .then((response) => response.json())
      .then((data) => setCourse(data));
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <>
      <Sidebar />
      <div className="box" id="add-student">
        <h1 className="add-heading">Add Student Details</h1>
        <form>
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="fname"
            placeholder="First Name"
            value={data.fname}
            className="form-input"
            required
          />
          <br></br>
          <br></br>
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="lname"
            placeholder="Last Name"
            value={data.lname}
            className="form-input"
            required
          />
          <br></br>
          <br></br>
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="YOJ"
            placeholder="Year of Join"
            value={data.YOJ}
            className="form-input"
            required
          />
          <br></br>
          <br></br>
          <input
            onChange={(e) => handle(e)}
            type="date"
            id="DOB"
            value={data.DOB}
            className="form-input"
            required
          />
          <br></br>
          <br></br>
          {/* <label>Select Course: </label> */}
          <select
            id="course"
            onChange={(e) => {
              handle(e);
            }}
            required
            className="form-input"
          >
            <option selected="true" disabled="disabled">
              Select course
            </option>
            {course &&
              course.length > 0 &&
              course.map((obj, index) => (
                <option value={obj.course_name}>{obj.course_name}</option>
              ))}
          </select>{" "}
          <br></br>
          <br></br>
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="Address"
            placeholder="Address"
            value={data.Address}
            className="form-input"
            required
          />
          <br></br>
          <br></br>
          <select
            onChange={(e) => handle(e)}
            id="BloodGroup"
            className="form-input"
            required
          >
            <option value="" disabled selected hidden>
              Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <br></br>
          <br></br>
          <button onClick= {(e) => {submit(e)}} id="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStudent;
