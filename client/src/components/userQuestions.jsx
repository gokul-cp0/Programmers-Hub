import React, { useEffect, useState,useContext } from "react";
import './CssForComponents/Css_AllQuestions.css';
import QuestionService from "../service/question_service";
import AnswerService from "../service/answer_service";
import { FormatToIST } from "../assets/IST-Time";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../api/AuthContext";

const UserQuestions=()=>{
    const [fetchData,setFetchData]=useState([]);
    const [answerCount,setAnswerCount]=useState({});
    const navigate=useNavigate();
    const {user}=useContext(AuthContext);

    useEffect(()=>{
        const FetchQuestions=async()=>{
            try {
                const getData=await QuestionService.fetchQuestionsByUserId();
                setFetchData(getData.data);
                getData.data.forEach((question) => {
                    HandleAnswerCount(question._id);
                });
            } catch (error) {
                console.error(error);
            }
        }
        FetchQuestions();
    },[]);    
    const HandleAnswerCount=async(id)=>{
        try {
            const NoAnswer= await AnswerService.fetchAnswers(id);
            setAnswerCount((prev) => ({
                ...prev,
                [id]: NoAnswer.data.length,
            }));
        } catch (error) {
            console.error(error);   
        }
    }
    return(
        <>
            <div className="QusContainer">
                <div className="questions">
                    <h3 className="allQusHead">Your Questions <i className="fa-solid fa-feather"></i></h3>
                    <div className="alignQuesMap">
                    {fetchData.map((data,index)=>(
                    <div className="quesMap" key={index}  onClick={()=>navigate(`/question/${data._id}`)}>
                        <h5>{data.title}</h5>
                        <p className="qusPre">{data.description}</p>
    
                        <div className="likeComment">
                            <div className="upvote"> 
                                <span>{data.likes.length} votes</span>
                                <span>{answerCount[data._id] ?? 0} answers</span>    
                            </div>
                            <div className="postUser"><i className="fa-solid fa-user"></i> <span className="postUserName">{data?.user?._id===user?.id?"You":data.user.name} </span>  asked {FormatToIST(data.createdAt)}</div>
                        </div>
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserQuestions;