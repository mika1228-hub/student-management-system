import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);
  const getStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addStudent = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/students", {
        name: name,
        course: course,
        age: Number(age)
      })
      .then(() => {
        setName("");
        setCourse("");
        setAge("");
        getStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };
  const updateStudent = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/students/${editingId}`, {
        name: name,
        course: course,
        age: Number(age)
      })
      .then(() => {
        setName("");
        setCourse("");
        setAge("");
        setEditingId(null);
        getStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        getStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cancelEdit = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  };
  return (
    <div>
      <h1>Student Management System</h1>
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={editingId ? updateStudent : addStudent}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Course: </label>
          <input
            type="text"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Age: </label>
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <br />
        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>
        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>
      <h2>Students</h2>
      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => editStudent(student)}>
            Edit
          </button>
          <button onClick={() => deleteStudent(student._id)}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;