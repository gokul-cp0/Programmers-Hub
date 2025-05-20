import React, { useEffect, useState,useRef,useContext, use } from "react";
import logo from '../assets/site_logo-bg.png';
import userPng from '../assets/user.png';
import './CssForPages/Css_HomePage.css';
import {Outlet,useNavigate,NavLink} from 'react-router-dom';
import { AuthContext } from "../api/AuthContext";


const HomePage = () => {

    const [dropdown,setDropdown]=useState(false);
    const dropdownRef=useRef();
    const navigate=useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [searchData,setSearchData]=useState('');    
    const [sidebarStyle,setSidbarStyle] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
            if(!event.target.className.includes('NavOption')){
                setSidbarStyle(false);
            }
           
        };
        const handleScroll = () => {
            setDropdown(false);
            setSidbarStyle(false);
        };
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleDropdown=()=>{  
        setDropdown(!dropdown);
    }
    const LogOutFun=()=>{
        navigate("/login");
        logout();
    }
   

    return (
        <>
            {!user && (
              <div className="popUpBG">
                <div className="popUpLogin">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <h6>You must be logged in to access this site.</h6>
                  <button onClick={LogOutFun}>Login</button>
                </div>
              </div>
            )}
            <nav className="home-nav">
                <button className="navbar-icon" onClick={()=>setSidbarStyle(!sidebarStyle)}><i className={`fa-solid fa-${sidebarStyle?'x':'bars'} NavOption`}></i></button>
                <img src={logo} alt="error" />
                <div className="search-bar">
                    <i className="fa-solid fa-magnifying-glass" ></i>
                    <input type="text" placeholder="Search..." value={searchData} onChange={(e)=>setSearchData(e.target.value)}/>
                </div>
                <div className={`profile-logo ${dropdown ? "profileActive" : ""}`} onClick={handleDropdown} ref={dropdownRef}>
                    <img src={userPng} alt="" />
                    {dropdown?
                    <div className="profile-dropdown" >
                        <h2 className="drop-name">Hi {user?.name} !</h2>
                        <div className="drop-logout">
                            <button onClick={LogOutFun}>Log out <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                        </div>
                    </div>:""}
                </div>
                <div className="search-bar secondOne">
                    <i className="fa-solid fa-magnifying-glass" ></i>
                    <input type="text" placeholder="Search..." value={searchData} onChange={(e)=>setSearchData(e.target.value)}/>
                </div>
            </nav>
            <div className="sidebarContainer"  style={sidebarStyle?{display:'flex'}:{}} >
                <ul className="sidebar-ul">
                    <NavLink to="/" className={({ isActive }) => isActive ? "active-sidbarLink" : ""} onClick={()=>setSidbarStyle(!sidebarStyle)}>
                        <li><i className="fa-solid fa-house"></i> Home</li>
                    </NavLink>
                    <NavLink to="create-post" className={({ isActive }) => isActive ? "active-sidebarLink" : ""} onClick={()=>setSidbarStyle(!sidebarStyle)}>
                        <li><i className="fa-solid fa-plus"></i> Create</li>
                    </NavLink>
                    <NavLink to="your-questions" className={({ isActive }) => isActive ? "active-sidebarLink" : ""} onClick={()=>setSidbarStyle(!sidebarStyle)}>
                        <li><i className="fa-solid fa-signs-post"></i> Your Questions</li>
                    </NavLink>
                </ul>
            </div>
            <div className="Content"><Outlet context={{searchData}}/></div>
         </>
    )
}

export default HomePage;


