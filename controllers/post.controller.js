const { response } = require("express");
const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const {uploadErrors} = require('../utils/errors.utils');

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error to get data : " + err);
    }
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  let fileName;
  if(req.file=!null){
    try{
      let file = req.files.file;
      if(
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg'
      ){
        throw Error("invalid file");
      }
      if(file.size>500000){
        throw Error('max size');
      }
    }catch(err){
      const errors = uploadErrors(err);
      return res.status(203).json({errors});
    }
    fileName= req.body.posterId + Date.now() + '.jpg';

    let uploadPath =__dirname +'/../client/public/uploads/posts/'+ fileName; 
    let file = req.files.file;
    file.mv(uploadPath);
  }




  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    picture: req.file!= null? "./uploads/posts/"+ fileName : '',
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(204).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(203).send("ID unknown:" + req.params.id);
  }

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true }
  )
    .then((docs) => res.send(docs))
    .catch((err) => console.log("Update error : " + err));
};



module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(203).send("ID unknown:" + req.params.id);
  }

  PostModel.findByIdAndRemove(req.params.id)
    .then((docs) => res.send(docs))
    .catch((err) => console.log("Delete error : " + err));
};

module.exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(203).send("ID unknown:" + req.params.id);
  }
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true }
    ).catch((err) => res.status(204).send(err));
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(204).send(err));
  } catch (err) {
    return res.status(203).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(203).send("ID unknown:" + req.params.id);
  }

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true }
    ).catch((err) => res.status(203).send(err));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(203).send(err));
  } catch (err) {
    return res.status(203).send(err);
  }
};


module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(203).send("ID unknown:" + req.params.id);
  }
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterUsername: req.body.commenterUsername,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(203).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.editCommentPost =  async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(203).send("ID unknown:" + req.params.id);
  }

  try{
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          comments:{
            text: req.body.text
          }
        }
      }, 
      {new: true}
    ).then((docs)=>{res.send(docs)})
    .catch((err) => res.status(203).send(err))
  }catch(err){
    return res.status(203).send(err)}
  };

  
module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(203).send("ID unknown:" + req.params.id);
  }
  try{
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments:{
            _id: req.body.commentId
          }
        }
      }, 
      {new: true}
    ).then((docs)=>{res.send(docs)})
    .catch((err) => res.status(203).send(err))
  }catch(err){
    return res.status(203).send(err)}
  }
