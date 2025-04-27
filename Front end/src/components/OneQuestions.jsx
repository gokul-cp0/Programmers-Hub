import React ,{ useEffect, useState,useRef,useContext } from "react";
import './CssForComponents/Css_Onequestions.css';
import { useParams,useNavigate } from 'react-router-dom';
import QuestionService from "../service/question_service";
import AnswerCom from "./answerComp";
import { AuthContext } from "../api/AuthContext";
import { FormatToIST } from "../assets/IST-Time";


const OneQuestion=()=>{
    const {id}=useParams();
    const [questionData,setQuestionData]=useState({});
    const [dropdown,setDropdown]=useState(false);
    const dropdownRef=useRef();
    const {user}=useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        if(id)gettingData(id)
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setDropdown(false);
                }
            };
            const handleScroll = () => {
                setDropdown(false);
            };
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("scroll", handleScroll);
            return () => {
                document.removeEventListener("click", handleClickOutside);
                document.removeEventListener("scroll", handleScroll);
            };
        },[id]);

    const gettingData=async(id)=>{
        try {
            const question=await QuestionService.fetchQuestionsById(id);
            setQuestionData(question.data);
        } catch (error) {
            console.error(error);
        }
    };
    const LikeToggle=async(id)=>{
        try {
            await QuestionService.toggleLike(id);
            gettingData(id);
        } catch (error) {
            console.error(error);
        }
    };
    const deleteQues=async(id)=>{
        try {
            await QuestionService.deleteQuestion(id);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
            <div className="oneQuesMap">
                <h5>{questionData.title}</h5>
                <pre className="oneQusPre">{questionData.description}</pre>

                <div className="oneLikeComment">
                    <div className={questionData?.likes?.includes(user?.id)?"upvoteLike toggle":"upvoteLike"} onClick={()=>LikeToggle(id)}>
                        <i className="fa-solid fa-caret-up"></i>
                        <span>{questionData?.likes?.length ?? 0} upvote</span>
                    </div>
                    <div className="postUser one"><i className="fa-solid fa-user"></i> <span className="postUserName">{questionData?.user?._id===user?.id?"You":questionData?.user?.name || ""} </span>  asked {FormatToIST(questionData.createdAt)}</div>
                    {user?.id===questionData.user?._id &&(
                        <>
                        <button className="OptionIcon" onClick={()=>setDropdown(!dropdown)} ref={dropdownRef}>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        {dropdown && (
                            <div className="queOptionMenu">
                                <button onClick={()=>navigate(`/edit-post/${questionData._id}`)}>
                                    <i className="fa-solid fa-pen"></i>Edit</button>
                                <button onClick={()=>deleteQues(questionData._id)}><i className="fa-solid fa-trash"></i>Delete</button>
                            </div>
                        )}
                        </>
                    )}
                </div>
                    <AnswerCom questionId={id} user={user}/>
            </div>
        </>
    )
}
export default OneQuestion;