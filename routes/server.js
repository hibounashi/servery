import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Route de test pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur backend !');
});

// Connecter MongoDB
mongoose.connect('mongodb://localhost:27017/tasks', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
