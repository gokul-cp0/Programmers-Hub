const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionByUserId,
  updateQuestion,
  deleteQuestion,
  toggleLike
} = require("../controllers/question.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware,createQuestion);
router.get("/", getAllQuestions);
router.get("/your-questions",authMiddleware, getQuestionByUserId);
router.get("/:id", getQuestionById);
router.put("/:id",authMiddleware,updateQuestion);
router.delete("/:id",authMiddleware,deleteQuestion);
router.put("/like/:id", authMiddleware,toggleLike);

module.exports = router;
 