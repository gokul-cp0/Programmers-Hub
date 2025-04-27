const Question = require("../models/question.model");

const createQuestion = async (req, res) => {
  const { title, description } = req.body;
  try {
    const question = await Question.create({
      title,
      description,
      user: req.user.id,
    });
    res.status(201).json({message:"Question Added successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("user", "name email").sort({ createdAt: -1});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user", "name email");
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getQuestionByUserId=async (req,res) => {
  try {
    const question =await Question.find({user:req.user.id}).populate("user","name");
    res.json(question);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    if (question.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    question.title = req.body.title || question.title;
    question.description = req.body.description || question.description;

    await question.save();
    res.json({ message: "Question updated successfully", question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    if (question.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await question.deleteOne();
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const alreadyLiked = question.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      question.likes = question.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      question.likes.push(userId);
    }

    await question.save();
    res.json({ likes: question.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { createQuestion, getAllQuestions, getQuestionById,getQuestionByUserId, updateQuestion, deleteQuestion,toggleLike };
