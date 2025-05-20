import React, { useState,useContext } from "react";
import "./CssForPages/Css_LoginPage.css";
import UserService from '../service/user_service';
import {useNavigate,Link} from "react-router-dom";
import { AuthContext } from "../api/AuthContext";
import siteLogo from '../assets/site_logo-bg.png';

const Login=()=>{
    const [userData,setUserData]=useState({email:"",password:""});
    const [errors,setErrors]=useState();
    const navigate=useNavigate();
    const {login}=useContext(AuthContext);

    const dataHandle=(e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    }
    const findData=async () => {
        try {
            const response=await UserService.login(userData);
            const token = response.data.token;
            login(token);
            setErrors("");
            navigate("/");
        } catch (error) {
            setErrors(error.response?.data?.message);
        }
    }
      const handleSubmit = (e) => {
        e.preventDefault();
        findData();
    };
    return(
        <>
            <div className="mainContainer">
                <img src={siteLogo} alt="" className="siteLogo"/>
                <div className="LoginHead">
                    <form onSubmit={handleSubmit}>
                        <h1>Log in</h1>
                        <input type="email" placeholder="Enter a email" name="email" value={userData.username || userData.email} onChange={dataHandle} required/>
                        <input type="password" placeholder="Enter Password" name="password" value={userData.password} onChange={dataHandle} required/>
                        <div>
                            <button type="submit" className="LoginButton">Log in</button>
                            <p className="errorMsg">{errors}</p>
                        </div>
                    </form>
                    <div className="SignUpLink">
                        <p>Create a new account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;
