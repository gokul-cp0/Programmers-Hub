import API from "../api/api";

const QuestionService={
    fetchQuestions : () => API.get("/questions"),
    fetchQuestionsById : (id)=> API.get(`/questions/${id}`),
    fetchQuestionsByUserId : ()=>API.get("/questions/your-questions"),
    createQuestion : (data) => API.post("/questions", data),
    updateQuestion : (id, data) => API.put(`/questions/${id}`, data),
    deleteQuestion : (id) => API.delete(`/questions/${id}`) ,
    toggleLike : (id)=>API.put(`/questions/like/${id}`)
}
export default QuestionService;