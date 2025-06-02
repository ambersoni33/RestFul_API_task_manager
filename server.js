
const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let idCounter = 1;

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const newTask = { id: idCounter++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Mark task as completed
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.completed = true;
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  const deletedTask = tasks.splice(index, 1);
  res.json({ message: "Task deleted", task: deletedTask });
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
