const Contact=require('../Models/Contact');
const {sendMail}=require('../helpers/email');
const {http_requests} = require('../metrics')

exports.addContact=async (req,res)=>{
    const {nom,prenom,email,telephone,adress,event,date,message}=req.body;
    const contact=new Contact({nom,prenom,email,telephone,adress,event,date,message})
    await contact.save()
    .then(data =>{sendMail(data); res.status(200).send({message:"contact added",data})})
    .catch(err => res.status(400).send({message:"error acquired"}))
}
exports.deleteContact=(req,res)=>{
    const id=req.params.id;
    Contact.findOneAndDelete(id)
    .then(data => res.status(200).send({message:"contact deleted"}))
    .catch(err => res.send({message:"error acquired"}))
}
exports.modifyContact=(req,res)=>{
    const id=req.params.id;
    Contact.findByIdAndUpdate(id,req.body)
    .then(data => {res.status(200).send({message:"contact modified",data});})
    .catch(err => res.status(400).send({message:"error acquired"}))
}
exports.contactPagination=async (req,res)=>{
    try{
        http_requests.inc()
        http_requests.inc({path:'/get/contacts'})
        const page=req.params.page;
        const pages=await Contact.countDocuments({});
    Contact.find()
    .skip( page > 0 ? ( ( page - 1 ) * 7 ) : 0 )
    .limit(7)
    .then(data => {
        res.status(200).send({data,pages:Math.ceil(pages/7)})
        http_requests.inc({code:200 , path:'/get/contacts'})
        http_requests.inc({code:200})
    })
    .catch(err => {
        res.status(400).send({message:"error acquired"})
        http_requests.inc({code:400})
        http_requests.inc({code:400 , path:'/get/contacts'})
    })
    }
    catch(err){
        res.send({error:"error acquired 2"})
    }
}
exports.searchContactByTel=(req,res)=>{
    const tel=req.params.tel;
    Contact.find({telephone:{$regex:tel}})
    .then(data => res.status(200).send({message:"contact found",data}))
    .catch(err => res.status(400).send({message:"error acquired"}))
}