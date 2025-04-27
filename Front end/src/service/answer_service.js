import API from "../api/api";

const AnswerService={
    postAnswer : (questionId, data) => API.post(`/answers/${questionId}`, data),
    fetchAnswers : (questionId) => API.get(`/answers/${questionId}`),
    deleteAnswer : (id) => API.delete(`/answers/${id}`),
    getAnswer : (answerId)=> API.get(`/answers/ans/${answerId}`),
    
    postReply : (answerId,data)=> API.post(`/answers/reply/${answerId}`,data),
    deleteReply : (answerId,replyId)=> API.delete(`/answers/reply/${answerId}/${replyId}`)
}
export default AnswerService;