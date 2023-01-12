import "./Sidebar.css";
import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar-div">
        <a href="/studentDetails" id="anchor-tag">Add Student</a>
        <a href="/studentScore" id="anchor-tag">Add score</a>
        <a href='/viewList' id="anchor-tag">View All Students</a>
        <a href='/toplist' id="anchor-tag">Toppers</a>
        
        <button id='logout-btn'><a href='/login' id='anchor-tag'>Logout</a></button>
    </div>

  );
};

export default Sidebar;
