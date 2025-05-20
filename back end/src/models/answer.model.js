const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answer: { type: String, required: true },
  replies: [{
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reply: { type: String, required: true }
  }]  
});

module.exports = mongoose.model("Answer", answerSchema);
