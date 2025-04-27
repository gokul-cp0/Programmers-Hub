const express = require("express");
const {
  postAnswer,
  getAnswersByQuestionId,
  deleteAnswer,
  getAnswersById,
  postReply,
  deleteReply
} = require("../controllers/answer.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:questionId",authMiddleware,postAnswer);
router.get("/:questionId", getAnswersByQuestionId);
router.delete("/:id",authMiddleware,deleteAnswer);
router.get("/ans/:answerId",getAnswersById);

router.post("/reply/:answerId",authMiddleware,postReply);
router.delete("/reply/:answerId/:replyId", authMiddleware, deleteReply);

module.exports = router;
