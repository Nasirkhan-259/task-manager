const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware

app.use(cors());
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v0ma2.mongodb.net/todo-app?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch(() => {
    console.log("Could not connected to Database");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
