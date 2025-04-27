import React, { useState,useEffect } from "react";
import './CssForComponents/Css_CreatePost.css';
import {useParams,useNavigate} from 'react-router-dom';
import QuestionService from "../service/question_service";

const UpdateQuestion=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    const [quesData,setQuesData]=useState({
         title: '',
         description: ''
    });

    const gettingData=async (id) => {
        try {
            const ques=await QuestionService.fetchQuestionsById(id);
            setQuesData(ques.data);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{if(id) gettingData(id)},[id]);

    const handleChangeData=(e)=>{
        const {name,value}=e.target;
        setQuesData({...quesData,[name]:value});
    }
    const DataUpdateHandle=async(e)=>{
        e.preventDefault();
        try {
            const ques=await QuestionService.updateQuestion(quesData._id,quesData);
            setQuesData(ques.data);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
        <h2>Update your question</h2>
        <div className="postContainer">
            <form className="PostDiv" onSubmit={DataUpdateHandle}>
                <h4>Title<span style={{color:"rgb(200, 50, 50)"}}>*</span></h4>
                <input type="text" className="postTitle" placeholder="Title" name="title" value={quesData?.title || ""} onChange={handleChangeData} required/>
                <h4 className="bodyHead">Body<span style={{color:"rgb(200, 50, 50)"}}>*</span></h4>
                <textarea className="postBody" name="description" value={quesData?.description || ""} onChange={handleChangeData} required></textarea>
                <button type="submit" className="postButton">update your question</button>
            </form>
        </div>
        </>
    )
}
export default UpdateQuestion;