import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import img from "../components/student pic.png";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const showToastMessage1 = () => {
    toast.error("Login failed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessage = () => {
    toast.success("Login Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessage2 = () => {
    toast.error("You are not a user please register", {
      position: toast.POSITION.TOP_CENTER,
    })
  }
  const url = "http://localhost:9000/login";
  function submit(e) {
    if (data.email !== "" && data.password !== "") {
      e.preventDefault();
      axios
        .post(url, {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          function toastMessage() {

            if (res.data.sucess == "True") {
              showToastMessage();
            } else if (res.data.sucess == "False") {
              showToastMessage1();
            }

            if (res.data.mail == "False") {
              showToastMessage2();;
            }
          }
          toastMessage();
          if (res.data.sucess == "True") {
            let role = res.data.role;
            if (role == "User") {
              navigate("/User");
            } else if (role == "Admin") {
              navigate("/Admin");
            } else {
              toast.error("Please select the role!", {
                position: toast.POSITION.TOP_CENTER,
              });
              e.preventDefault();
            }
          }
        });
    } else {
      toast.error("Please enter all details !", {
        position: toast.POSITION.TOP_CENTER,
      });
      e.preventDefault();
    }
  }
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  return (
    <div className="login-img">
      <div id="login-div">
        <div id="login-form">
          <h1 className="heading">Log in</h1>
          <form onSubmit={(e) => submit(e)}>
            <input
              onChange={(e) => handle(e)}
              type="email"
              id="email"
              placeholder="Email"
              className="input-box"
              value={data.email}
            />
            <br />
            <br />
            <input
              onChange={(e) => handle(e)}
              type="password"
              id="password"
              placeholder="Password"
              className="input-box"
              value={data.password}
            />
            <br />
            <br />
            <button type="submit" className="input-box" id="btn">
              Log in
            </button>
          </form>
        </div>
        <div id="signup-link">
          <p>Don't have account yet?</p>
          <Link to="/signup" id="link-color">
            Create Account
          </Link>
        </div>
      </div>
      <div>
        <img src={img} className="user-img" />
      </div>
    </div>
  );
};
export default Login;
