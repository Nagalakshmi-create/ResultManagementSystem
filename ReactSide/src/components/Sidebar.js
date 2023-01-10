import './Sidebar.css'

const Sidebar = ()=> {
    return(
        <div className="sidebar-div">
            {/* <br></br><br></br> */}
            <a href="/studentDetails" id="anchor-tag">Add Student</a>
            {/* <br></br><br></br>
            <hr></hr> */}
            <a href="/studentScore" id="anchor-tag">Add score</a>
            {/* <br></br><br></br>
            <hr></hr> */}
            <a href='/viewList' id="anchor-tag">View Students</a>
            {/* <hr></hr> */}
            <button id='logout-btn'><a href='/login' id='anchor-tag'>Logout</a></button>
        </div>

    )
}

export default Sidebar