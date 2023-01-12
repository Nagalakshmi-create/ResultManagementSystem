import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import Admin from "./components/Admin";
import AddStudent from "./components/AddStudent";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddScore from "./components/AddScore";
import ViewList from "./components/ViewList";
import User from "./components/User";
import ViewTop from "./components/ViewTop";


function App() {
  const location = useLocation()
  return (
    <>
      <ToastContainer/>
      {location.pathname == '/' && <Login />}
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/studentDetails" element={<AddStudent/>} />
          <Route exact path="/studentScore" element={<AddScore/>} />
          <Route exact path="/Admin" element={<ViewList/>} />
          <Route exact path="/ViewList" element={<ViewList/>} />
          <Route exact path="/toplist" element={<ViewTop/>} />
          <Route exact path="/User" element={<User/>} />
        </Routes>
      
    </>
  );
}

export default App;
