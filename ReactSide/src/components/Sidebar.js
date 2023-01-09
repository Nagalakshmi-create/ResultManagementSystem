import './Sidebar.css'

const Sidebar = ()=> {
    return(
        <div className="sidebar-div">
            <br></br><br></br>
            <a href="/studentDetails" >Add Student</a><br></br><br></br>
            <hr></hr>
            <a href="/studentScore">Add score</a><br></br><br></br>
            <hr></hr>
            <a href='/viewList'>View Students</a>
            <hr></hr>
        </div>
    )
}

export default Sidebar