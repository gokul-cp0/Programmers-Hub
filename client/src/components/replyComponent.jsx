import { useState, useEffect } from "react";
import './CssForComponents/Css_ReplyComp.css';
import AnswerService from "../service/answer_service";

const ReplyComp = ({answerId, user }) => {
  const [replyData, setReplyData] = useState({ reply: "" });
  const [replies, setReplies] = useState([]);
  const handleReply = (e) => {
    setReplyData({ ...replyData, [e.target.name]: e.target.value });
  }; 

    useEffect(() => {
      fetchReplies(answerId);
    },[answerId]);
    
    const fetchReplies = async (answerId) => {
    try {
      const res = await AnswerService.getAnswer(answerId);
      setReplies(res?.data?.replies || []);
    } catch (error) {
      console.error("Failed to load replies", error);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      await AnswerService.postReply(answerId, replyData);
      setReplyData({ reply: "" });
      fetchReplies(answerId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
    await AnswerService.deleteReply(answerId, replyId);
      fetchReplies(answerId);
    } catch (error) {
      console.error("Failed to delete reply", error);
    }
  };


  return (
    <div>
      <div className="hrReply"></div>
       {replies.length > 0 ? (
         replies.map((data,index) => (
           <div className="repliesDiv" key={index}>
             <h6>{data?.user?.name || "unknown"}</h6>
             <pre className="ansPre">
               {data?.reply || ""}
               <div className="AnsOptionIcon">
                 {user?.id === data?.user?._id && (
                   <button onClick={() => handleDeleteReply(data._id)}>
                     <i className="fa-solid fa-trash"></i> Delete
                   </button>
                 )}
               </div>
             </pre>
           </div>
         ))
       ) : (
         <span className="emptyAnsText">No replies yet.</span>
       )}
      <form onSubmit={handleReplySubmit} className="yourComment">
        <textarea
          className="replyArea"
          placeholder="Reply"
          name="reply"
          value={replyData.reply}
          onChange={handleReply}
          required
        ></textarea>
        <button type="submit" className="answerButton">Send</button>
      </form>
    </div>
  );
};

export default ReplyComp;
