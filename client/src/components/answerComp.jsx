import { useEffect, useState} from 'react';
import './CssForComponents/Css_answerComp.css';
import AnswerService from '../service/answer_service';
import ReplyComp from './replyComponent';

const AnswerCom=({questionId,user})=>{
    const [answerData,setAnswerData]=useState({answer:""});
    const [fetchAnswer,setFetchAnswer]=useState([]);
    const [toggleReply,setToggleReply]=useState("");
    
    const handleChange=(e)=>{
        setAnswerData({...answerData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await AnswerService.postAnswer(questionId,answerData);
            fetchingAnswer(questionId);
            setAnswerData({answer:""});
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        fetchingAnswer(questionId);
    },[questionId]);

    const fetchingAnswer=async(questionId)=>{
        try {
            const answer=await AnswerService.fetchAnswers(questionId);
            setFetchAnswer(answer.data);

        } catch (error) {
            console.error(error);
        }
    }
    const deleteans=async(id)=>{
        try {
            await AnswerService.deleteAnswer(id);
            fetchingAnswer(questionId);
        } catch (error) {
            console.error(error);
        }

    }
    
    return(
        <div className="commentDiv">
            <form onSubmit={handleSubmit} className="yourComment">
                <textarea className="answerArea" placeholder="Share your answer..." name='answer' value={answerData.answer} onChange={handleChange} required></textarea>
                <button type='submit' className="answerButton">Post Your Answer</button>
            </form>
            <div className="UserCommentDiv">
                <div className="hrAnswer"></div>
                <div className="answerDiv">
                {fetchAnswer.length === 0 ? (
                <span className='emptyAnsText'>No answers yet.</span>
            ) : (fetchAnswer.map((data,index)=>(
                    <div className="ansMap" key={index}>
                        <h6>{user?.id===data.userId?._id ?"You":data?.userId?.name}</h6>
                        <pre className="ansPre">
                            {data.answer}
                            <div className="AnsOptionIcon">
                                <button className={toggleReply === data?._id ?'reply active':'reply' } onClick={()=>setToggleReply(prev => prev === data._id ? null : data._id)}><i className="fa-solid fa-reply"></i> Reply</button>
                                {user?.id===data.userId?._id &&(
                                    <button onClick={()=>deleteans(data._id)}><i className="fa-solid fa-trash"></i>Delete</button>
                                )}
                            </div>
                        </pre>
                        { toggleReply === data?._id &&(
                        <div className="replyDiv">
                            <ReplyComp answerId={data._id} user={user}/>
                        </div>)}
                    </div>
                ))
                )}
                </div>
            </div>
        </div>
    )
}
export default AnswerCom;