var exp = require('express');
const router = exp.Router();   
var path = require('path') ;
var mongo = require('mongoose')
var bodyparser = require('body-parser');
var url = "mongodb://localhost/sdb"

var emp = require('../model/employee');

var multer = require('multer'); //module to upload files

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  
var upload = multer({ storage : storage}).single('file1');  

router.use(exp.static(path.join(__dirname+"/public")));

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

router.post("/add", upload, (req,res)=>{
    var e1 = new emp();
    e1.eid = req.body.eid;
    e1.name = req.body.ename;
    e1.salary = req.body.sal;
    e1.photo = req.file.filename;
    
    e1.save((err)=>{
        if(err) throw err;
        else res.send("Data Added")
    });        //insert data
})

router.get("/:id", (req,res)=>{
    var file = req.params.id;
    var fileLocation = path.join('./public/images',file);
    res.download(fileLocation,file)
})

router.get("/edit/:eid",(req,res)=>{
    emp.find({eid:req.params.eid},(err,result)=>{
        if(err) throw err;
        else res.render("edit",{emp:result})
    })
})

router.post("/update",(req,res)=>{
    emp.updateOne({eid:req.body.eid}, {$set:{name:req.body.ename, salary:req.body.sal}}, (err,result)=>{
        if (err) throw err;
        else {
            emp.find({},(err,result)=>{
                if(err) throw err;
                else 
                    res.render("view", {empData: result});
            });
        }
    })
})
module.exports = router;

