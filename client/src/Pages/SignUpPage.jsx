import React, { useState } from "react";
import "./CssForPages/Css_SignUpPage.css";
import UserService from '../service/user_service';
import { Link,useNavigate} from "react-router-dom";
import siteLogo from '../assets/site_logo-bg.png';


const SignUp=()=>{
    const initialObject={
        name: "",
        email: "",
        password: "",
        confPassword: ""}

    const [userData,setUserData]=useState(initialObject);
    const [errors,setErrors]=useState({});
    const navigate=useNavigate();

    const dataHandle=(e)=>{
        const {name,value}=e.target;
        setUserData({...userData,[name]:value});
    }

    const dataValidate=()=>{
            let newErrors = {};
            
            if (!/^[a-zA-Z\s]{5,}$/.test(userData.name)) {
              newErrors.name = "Name must be at least 5 letters and contain no numbers";
            }
            if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
              newErrors.email = "Enter a valid email address";
            }
            if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{9,}$/.test(userData.password)) {
              newErrors.password = "Password must be at least 9 characters, contain a number, and a special character";
            }
            if (userData.password !== userData.confPassword) {
              newErrors.confPassword = "Passwords do not match";
            }
            
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
          };

          const sendData = async () => {
            try {
              const user = {
                name: userData.name,
                email: userData.email,
                password: userData.password
              };
              await UserService.signup(user);
              navigate('/login');
            } catch (error) {
          
              if (error.response) {
                alert(error.response.data.message);
              }

            }
          };
          
          const handleSubmit = (e) => {
            e.preventDefault();
            if (dataValidate()) {
              sendData();
              }
            }
        
    return(
        <>
            <div className="mainContainer">
              <img src={siteLogo} alt="" className="siteLogo"/>
                <div className="signUpHead">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign up</h1>

                        <input type="text" placeholder="Name" name="name" value={userData.name} onChange={dataHandle} required/>
                        <p className="signUp_namep">{errors.name}</p>

                        <input type="email" placeholder="email" name="email" value={userData.email} onChange={dataHandle} required/>
                        <p className="signUp_emailp">{errors.email}</p>
                        
                        <input type="password" placeholder="Enter a Password" name="password" value={userData.password} onChange={dataHandle} required/>
                        <p className="signUp_passwordp">{errors.password}</p>

                        <input type="password" placeholder="Confirm a password" name="confPassword" value={userData.confPassword} onChange={dataHandle} required/>
                        <p className="signUp_confPassp">{errors.confPassword}</p>

                        <div>
                            <button type="submit" className="signUpButton">Sign up</button>
                        </div>
                    </form>
                    <div className="loginLink">
                        <p>Have an Account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp;
