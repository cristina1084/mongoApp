var exp = require('express');
const router = exp.Router();    

router.get("/",(req,res)=>{
    res.render("view");
})

module.exports = router;