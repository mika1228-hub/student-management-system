const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("./models/Student");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Student Management System API is running");
});
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to retrieve students"
    });
  }
});
app.post("/students", async (req, res) => {
  try {
    const { name, course, age } = req.body;
    const newStudent = new Student({
      name: name,
      course: course,
      age: age
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add student"
    });
  }
});
app.put("/students/:id", async (req, res) => {
  try {
    const { name, course, age } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        course: course,
        age: age
      },
      {
        new: true
      }
    );
    res.json(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update student"
    });
  }
});
app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(
      req.params.id
    );
    res.json(deletedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to delete student"
    });
  }
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });