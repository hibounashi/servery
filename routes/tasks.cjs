const express = require("express");
const cors = require("cors");

const router = express.Router(); // Utilisez un routeur, pas une application complète

// Middleware
router.use(cors());
router.use(express.json());

// Données en mémoire (simulant une base de données)
let tasks = [
  { id: 1, title: "Préparer la série de TD", state: "Not started", date: "2024-11-24", priority: "High" },
  { id: 2, title: "Réviser le cours de maths", state: "In progress", date: "2024-11-25", priority: "Medium" },
  { id: 3, title: "Terminer le projet web", state: "Done", date: "2024-11-26", priority: "Low" },
];

// Routes
router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, state, date, priority } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: "Titre et date sont requis" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    state,
    date,
    priority,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, state, date, priority } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }

  tasks[taskIndex] = { id: parseInt(id), title, state, date, priority };
  res.json(tasks[taskIndex]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router; // Exportez le routeur
