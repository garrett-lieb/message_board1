const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll({
          include: [{ model: Comment }],
      });
      res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// get one post

router.get('/:id', async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [{ model: Comment }],
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }

      res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// create new post
// commented this one out because we may not need it, dont delete just in case 

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
            
        });
        console.log(newPost);
        
        console.log("new post created");
        res.status(200).json(newPost);
      
    } catch (err) {
      console.error(err);
        res.status(500).json(err);
      
    }
  });


  router.post('/post', withAuth, async (req, res) => {
    const { topic, description } = req.body;
  if (!req.session.user) {
     return res.status(401).json({ message: 'You must be logged in to create a post'});
     return res.redirect('/login')
  }
  
  const newPost = await Post.create({
     topic,
     description,
     user_id: req.session.user_id
  });
 
  if(!topic || !description) {
          return res.status(400).json({ message: 'Please provide a topic and description for your post'})
  } else {
      res.status(200).json({ message: 'Post created succesfully' });
  }});

router.delete('/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }

      res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;