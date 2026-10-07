const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Students");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error.", error);
  });
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});
app.post("/students", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    course: req.body.course,
    age: req.body.age,
  });
  await student.save();
  res.json(student);
});
app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      course: req.body.course,
      age: req.body.age,
    },
    { new: true }
  );
  res.json(student);
});
app.delete("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  res.json(student);
});
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
module.exports = app;