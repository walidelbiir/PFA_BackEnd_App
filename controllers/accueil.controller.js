const Accueil=require('../Models/Accueil');
const storage = require("../helpers/multer");
const multer = require("multer");
const cloudinary=require('../helpers/cloudinary');
const fs = require("fs");
const {http_requests} = require("../metrics")

exports.addPostImage=async (req,res)=>{
    try {
        const upload = multer({ storage }).any("image");
        upload(req, res, async (err) => {
          if (req.files) {
            const files = req.files;
            let result = {};
            let cloudinary_ids = [];
            let pictures = [];
            for (const file of files) {
              const { path } = file;
              result = await cloudinary.uploader.upload(path);
              cloudinary_ids.push(result.public_id);
              pictures.push(result.secure_url);
              fs.unlinkSync(path);
            }
            if (result) {
              const accueil=new Accueil({image:pictures[0],title:"",description:"",isActive:true});
              await accueil.save()
              .then((data)=> res.status(200).send({message:"image added",data}))
              .catch(err => res.status(406).send('error'));
            } else {
              res.status(400).send({ error: "cannot upload" });
            }
          } else {
            res
              .status(200)
              .send({ message: " succés", cloudinary_ids, pictures });
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

exports.addPost=async (req,res)=>{
    const id=req.params.id;
    await Accueil.findByIdAndUpdate(id,req.body)
    .then((data)=> res.status(200).send({message:"post accueil added",data}))
    .catch(err => res.status(406).send('error'));
}

exports.deletePost=async (req,res)=>{
    const id=req.params.id;
    await Accueil.findByIdAndDelete(id)
    .then(data => res.status(200).send({message:"post deleted",data}))
    .catch(err => res.status(400).send({message:"error acquired"}))
}

exports.modifyImage=async (req,res)=>{
    try {
        const upload = multer({ storage }).any("image");
        upload(req, res, async (err) => {
          if (req.files) {
            const files = req.files;
            let result = {};
            let cloudinary_ids = [];
            let pictures = [];
            for (const file of files) {
              const { path } = file;
              result = await cloudinary.uploader.upload(path);
              cloudinary_ids.push(result.public_id);
              pictures.push(result.secure_url);
              fs.unlinkSync(path);
            }
            if (result) {
                const id=req.params.id;
              await Accueil.findByIdAndUpdate(id,{image:pictures[0]})
              .then((data)=> res.status(200).send({message:"image modified",data}))
              .catch(err => res.status(406).send('error'));
            } else {
              res.status(400).send({ error: "cannot upload" });
            }
          } else {
            res
              .status(200)
              .send({ message: " succés", cloudinary_ids, pictures });
          }
        });
      } catch (error) {
        console.error(error);
      }
}



exports.activatedAccueilPosts=(req,res)=>{
  try{
    http_requests.inc()
    http_requests.inc({path:'/active/post'})
    Accueil.find({isActive:true})
    .then(data=>{
      res.status(200).send({data})
      http_requests.inc({code : 200})
      http_requests.inc({code : 200 , path : '/active/post'})
  })
    .catch(()=>{
      res.status(400).send({message:"no data returned"})
      http_requests.inc({code : 400})
      http_requests.inc({code : 400 , path : '/active/post'})
    })
  }
  catch(e) {
    res.status(400).send({message:"no data returned"})
    http_requests.inc({code : 400})
    http_requests.inc({code : 400 , path : '/active/post'})
  }
}
exports.allAccueilPosts=(req,res)=>{
    Accueil.find()
    .then(data=>res.status(200).send({data}))
    .catch(err=>res.status(400).send({message:"no data returned"}))
}