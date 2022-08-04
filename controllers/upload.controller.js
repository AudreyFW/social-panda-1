const UserModel= require("../models/user.model");
const fs = require("fs");
const { promisify }= require("util");
const { uploadErrors } = require("../utils/errors.utils");


module.exports.uploadProfil = async(req, res) => {
  try{
    if(!req.files||Object.keys(req.files).length===0){
      throw Error('no files were upload');
    }
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
  let fileName = req.body.name + '.jpg';
  let uploadPath =__dirname +'/../client/public/uploads/profil/'+ fileName; 
  let file = req.files.file;

  file.mv(uploadPath) ;
 

  await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set : {picture: "./uploads/profil/" + fileName}},
      { new: true})
      .then(docs=> res.send(docs))
      .catch(err=> res.status(203).send({message:err}));

}