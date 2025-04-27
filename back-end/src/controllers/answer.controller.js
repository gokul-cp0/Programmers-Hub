const Answer = require("../models/answer.model");

const postAnswer = async (req, res) => {
  const { answer } = req.body;
  try {
    const newAnswer = await Answer.create({
      answer,
      questionId: req.params.questionId,
      userId: req.user.id,
    });

    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnswersByQuestionId = async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId }).populate("userId", "name");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (answer.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await answer.deleteOne();
    res.json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnswersById=async (req,res) => {
  try {
    const answer =await Answer.findById(req.params.answerId).populate("userId","name").populate("replies.user", "name");
    res.json(answer);
  } catch (error) {
    res.status(500).json({message:error.message});
    console.error(error);
  }
};

const postReply=async (req,res)=>{
  const { reply } = req.body;
  const { answerId } = req.params;
  try {
    const answer = await Answer.findById(answerId);
    answer.replies.push({reply,user:req.user.id});
    await answer.save();
    res.status(201).json({ message: "Reply added successfully", answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteReply=async (req,res) => {
  const { answerId, replyId } = req.params;
  try {
    const answer = await Answer.findById(answerId);
    answer.replies.pull(replyId);
    await answer.save();
    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Delete Reply Error:", error);
    res.status(500).json({ message: error.message });
  }
}
module.exports = { postAnswer, getAnswersByQuestionId, deleteAnswer,postReply,deleteReply,getAnswersById};
