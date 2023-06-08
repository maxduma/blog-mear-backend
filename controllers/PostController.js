import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve articles'
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate({_id: postId}, {$inc: {viewsCount: 1}}, {returnDocument: 'after'})
     .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(404).json({
        message: 'Failed to retrieve articles'
      });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve articles'
    });
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create article'
    });
  }
}