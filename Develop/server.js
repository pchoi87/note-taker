const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const notesFilePath = __dirname + '/Develop/db/db.json';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(__dirname + './db.json'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(__dirname + './db.json'));
  const newNote = req.body;
  notes.push(newNote);
  fs.writeFileSync(__dirname + '/db.json', JSON.stringify(notes));
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
