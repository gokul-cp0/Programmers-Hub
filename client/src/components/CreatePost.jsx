import React, { useState } from "react";
import './CssForComponents/Css_CreatePost.css';
import QuestionService from "../service/question_service";
import { useNavigate } from 'react-router-dom';

const CreatePost=()=>{
    
    const [postData,setPostData]=useState({
        title:"",
        description:""
    });
    const [postError,setPostError]=useState({});
    const navigate=useNavigate();

    const handleInput=(e)=>{
        const {value,name}=e.target;
        setPostData({...postData,[name]:value});
    }
    const handleValidate=()=>{
        const newError={};
        if(postData.title.trim().length < 15){
            newError.title="Title must be at least 10 characters.";
        }
        if(postData.description.trim().length<30){
            newError.description="Body must be at least 30 characters";
        }
        setPostError(newError);
        return Object.keys(newError).length===0;
    }
    const sendPostData=async()=>{
        try {
           await QuestionService.createQuestion(postData);
           const result = window.confirm("Post added successfully! Go to Home?");
            if (result) {
              navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(handleValidate()){
                sendPostData();
        }
    }
    return(
        <>
        <h2 className="allQusHead">Ask a public question</h2>
        <div className="postContainer">
            <form className="PostDiv" onSubmit={handleSubmit}>
                <h4>Title<span style={{color:"rgb(200, 50, 50)"}}>*</span></h4>
                <input type="text" className="postTitle" placeholder="Title" name="title" value={postData.title} onChange={handleInput}  required/>
                <span className="ErrorSpan">{postError.title}</span>
                <h4 className="bodyHead">Body<span style={{color:"rgb(200, 50, 50)"}}>*</span></h4>
                <textarea className="postBody" placeholder="Share your answer..." name="description" value={postData.description} onChange={handleInput} required ></textarea>
                <span className="ErrorSpan">{postError.description}</span><br />
                <button type="submit" className="postButton">Post your question</button>
            </form>
        </div>
        </>
    )
}
export default CreatePost;