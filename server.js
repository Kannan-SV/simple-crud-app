const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kannansv:9cQd63EYtxGZNOW5@items.o0mwhlg.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

const Item = require('./models/item.model');

// Create
app.post('/items/add', (req, res) => {
  const { name, description } = req.body;
  const newItem = new Item({ name, description });

  newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Read
app.get('/items', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update
app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;

  Item.findByIdAndUpdate(req.params.id, { name, description })
    .then(() => res.json('Item updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete
app.delete('/items/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
