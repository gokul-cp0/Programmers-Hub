require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const userRoutes = require("./src/routes/user.routes");
const questionRoutes = require("./src/routes/question.routes");
const answerRoutes = require("./src/routes/answer.routes");

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
  res.send("Application is running");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
