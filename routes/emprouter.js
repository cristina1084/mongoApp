var exp = require('express');
const router = exp.Router();    
var mongo = require('mongoose')
var bodyparser = require('body-parser');
var url = "mongodb://localhost/sdb"

var emp = require('../model/employee');

router.use(bodyparser.urlencoded({extended:true}));

mongo.connect(url,(err)=>{
    if(err) throw err;
    else console.log("Database connected");
})

router.get("/new",(req,res)=>{
    res.render("new");
})

router.get("/view",(req,res)=>{
    res.render("view");
})

router.post("/add",(req,res)=>{
    var e1 = new emp();
    e1.eid = req.body.eid;
    e1.name = req.body.ename;
    e1.salary = req.body.sal;
    e1.save((err)=>{
        if(err) throw err;
        else res.send("Data Added")
    });        //insert data
})

module.exports = router;