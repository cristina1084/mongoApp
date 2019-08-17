var exp = require('express');
const router = exp.Router();    
var mongo = require('mongoose')
var bodyparser = require('body-parser');
var url = "mongodb://localhost/sdb"

var emp = require('../model/employee');

var multer = require('multer'); //module to upload files
var upload = multer({dest:'uploads/'}); //destination folder
var type = upload.single('file1'); //mention the file upload control name ... single mentions only one is uploading

router.use(bodyparser.urlencoded({extended:true}));

mongo.connect(url,{useNewUrlParser:true}, (err)=>{
    if(err) throw err;
    else console.log("Database connected");
})

router.get("/new",(req,res)=>{
    res.render("new");
})

router.get("/view",(req,res)=>{
    emp.find({},(err,result)=>{
        if(err) throw err;
        else 
            res.render("view", {empData: result});
    });
})

router.post("/add", type, (req,res)=>{
    var e1 = new emp();
    e1.eid = req.body.eid;
    e1.name = req.body.ename;
    e1.salary = req.body.sal;
    e1.photo = req.body.file1;
    
    e1.save((err)=>{
        if(err) throw err;
        else res.send("Data Added")
    });        //insert data
})

module.exports = router;

