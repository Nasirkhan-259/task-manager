const express = require('express');
let Posts = require('../../models/posts');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  res.send(await Posts.find({}));
});

// Add Post
router.post('/', async (req, res) => {
  await Posts.create({
    title: req.body.title
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  await Posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});



module.exports = router;
