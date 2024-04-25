const Social=require('../Models/Social');
const {http_requests} = require('../metrics')

exports.addSocial=(req,res)=>{
    const {tel,email,adress,facebook,youtube,instagram,twitter,whatsapp,pinterest}=req.body;
    const social=new Social({tel,email,adress,facebook,youtube,instagram,twitter,whatsapp,pinterest})
    social.save()
    .then(data => res.status(200).send({data}))
    .catch(err => res.status(400).send({err}))
}
exports.addSocialUrl=async (req,res)=>{
    try{
        const soc=await Social.find();
        Social.findByIdAndUpdate(soc[0]._id,req.body)
        .then(() => res.status(200).send({message:"data modified",id:soc[0]._id}))
        .catch(() => res.status(400).send({error:"error acquired 1"}))
    }
    catch(err){
        res.send({error:"error acquired 2"})
    }
}
exports.getSocial=(req,res)=>{
    http_requests.inc()
    http_requests.inc({path:'/get/social'})
    Social.find()
    .then((data) => {
        res.status(200).send({message:"data modified",data})
        http_requests.inc({code:200})
        http_requests.inc({code:200 , path:'/get/social'})
    })
    .catch(() => {
        res.status(400).send({error:"error acquired"})
        http_requests.inc({code:400})
        http_requests.inc({code:400 , path:'/get/social'})
    })
}
