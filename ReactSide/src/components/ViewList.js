import "./ViewList.css";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import moment from "moment";
import axios from "axios";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

const ViewList = () => {
  const [show, setShow] = useState(true);
  const  [searchedBook, setsearchedBook] = useState([]);
  const [searchValue, setsearchValue] = useState();
  const [studentList, setStudentList] = useState([]);

  const fetchData = () => {
    return fetch("http://localhost:9000/viewList")
      .then((response) => response.json())
      .then((data) => setStudentList(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  

  const url = "http://localhost:9000/delete"; //URL To delete Student
  const url1 = "http://localhost:9000/search";

  const handleSearch = (e) => {
    console.log("text", e.target.value);
    axios
      .post(url1, {
        text: e.target.value,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setShow(false);
        }
        setsearchedBook(res.data);
        console.log("TEST", res.data);
      });
  };

  const handleChange = (e) => {
    setsearchValue(e.target.value);
  };

  const submit = () => {
    console.log("checking", searchValue);

    axios
      .post(url, {
        search: searchValue,
      })
      .then((res) => {});
  };

  const deleteStudent = (id) => {
    //Function to delete the student
    let check = window.confirm("Are you sure you want to delete this student?");
    if (check == true) {
      axios
        .post(url, {
          id: id,
        })
        .then((res) => {
          console.log("Deleted successfully");
        });
      window.location.reload(false);
    } else {
      console.log("Not deleted");
    }
  };

  return (
    <>
      <Sidebar />
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search course"
          className="search-box"
          aria-label="Search"
          onChange={(e) => handleSearch(e)}
        />

        {/* <Button
          variant="outline-primary"
          size="lg"
          className="btn"
          onClick={submit}
        >
          Search
        </Button> */}
      </Form>

      {!show ? (
        <div className="search-table">
          {searchedBook.length > 0 && (
            <table className="table table-bordered shadow-lg">
              <thead className="table-dark">
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Course</th>
                  <th>Year of Join</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Blood Group</th>
                  <th>Total Marks</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {searchedBook &&
                  searchedBook.length > 0 &&
                  searchedBook.map((obj, index) => (
                    <tr key={index}>
                      <td>{obj.id}</td>
                      <td className="status-font">{obj.firstname}</td>
                      <td className="status-font">{obj.lastname}</td>
                      <td className="status-font">{obj.course_name}</td>
                      <td className="status-font">{obj.yearofjoin}</td>
                      <td className="status-font">
                        {moment(obj.dob).format("YYYY-MM-DD")}
                      </td>
                      <td className="status-font">{obj.address}</td>
                      <td className="status-font">{obj.bloodgroup}</td>
                      <td className="status-font">{obj.total}</td>
                      <td
                        className="text-center cursor"
                        onClick={() => {
                          deleteStudent(obj.id);
                        }}
                      >
                        🗑
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        ""
      )}

      <div id="list-div">
        <main>
          {/* <h1 style={{ textAlign: "center", color: "blue", marginBottom: 30 }}>
            {" "}
            Student List
          </h1> */}
          {show ? (
            <table className="table table-bordered shadow-lg">
              <thead className="table-dark">
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Course</th>
                  <th>Year of Join</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Blood Group</th>
                  <th>Total Marks</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {studentList &&
                  studentList.length > 0 &&
                  studentList.map((obj, index) => (
                    <tr key={index}>
                      <td>{obj.id}</td>
                      <td className="status-font">{obj.firstname}</td>
                      <td className="status-font">{obj.lastname}</td>
                      <td className="status-font">{obj.course_name}</td>
                      <td className="status-font">{obj.yearofjoin}</td>
                      <td className="status-font">
                        {moment(obj.dob).format("YYYY-MM-DD")}
                      </td>
                      <td className="status-font">{obj.address}</td>
                      <td className="status-font">{obj.bloodgroup}</td>
                      <td className="status-font">{obj.total}</td>
                      <td
                        className="text-center cursor"
                        onClick={() => {
                          deleteStudent(obj.id);
                        }}
                      >
                        🗑
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </main>
      </div>
    </>
  );
};
export default ViewList;
