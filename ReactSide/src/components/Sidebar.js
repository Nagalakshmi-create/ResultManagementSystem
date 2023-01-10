import "./Sidebar.css";
import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import Tabs from "react-bootstrap/Tabs";
// import Tab from "react-bootstrap/Tab";
// import { createAppContainer } from "react-navigation";
// import { createMaterialTopTabNavigator } from "react-navigation-tabs";
// import AddStudent from "./components/AddStudent";
// import AddScore from "./components/AddScore";
// import ViewList from "./components/ViewList";


const Sidebar = () => {
  return (
    <div className="sidebar-div">
        <a href="/studentDetails" id="anchor-tag">Add Student</a>
        <a href="/studentScore" id="anchor-tag">Add score</a>
        <a href='/viewList' id="anchor-tag">View Students</a>
        <button id='logout-btn'><a href='/login' id='anchor-tag'>Logout</a></button>
    </div>

    // <div style={{ display: "block", width: 700, padding: 30 }}>
    //   <Tabs defaultActiveKey="second">
    //     <Tab eventKey="first" title="Dashboard" href="/studentDetails">
    //     <a href="/studentDetails" id="anchor-tag">Add Student</a>
    //     <h1>Hii</h1>
    //     </Tab>
    //     <Tab eventKey="second" title="Setting">
    //     <a href="/studentScore" id="anchor-tag">Add score</a>
    //     </Tab>
    //     <Tab eventKey="third" title="Aboutus">
    //     <a href='/viewList' id="anchor-tag">View Students</a>
    //     </Tab>
    //   </Tabs>
    // </div>


    // {
    //     AddStudent: {
    //       screen: AddStudent,
    //       navigationOptions: {
    //         tabBarLabel: "Add student",
    //         showLabel: ({ focused }) => {
    //           console.log(focused);
    //           return focused ? true : false;
    //         },
    //       },
    //     },
    //     Images: {
    //       screen: AddScore,
    //       navigationOptions: {
    //         tabBarLabel: "Add score",
    //       },
    //     },
    //     Video: {
    //       screen: ViewList,
    //       navigationOptions: {
    //         tabBarLabel: "Videos",
    //       },
    //     },
    //   },
    //   {
    //     tabBarOptions: {
    //       showIcon: true,
      
    //       style: {
    //         backgroundColor: "#006600",
    //         marginTop: 28,
    //       },
    //     },
    //   }


  );
};

export default Sidebar;
