var exp = require('express');
const router = exp.Router();    

router.get("/",(req,res)=>{
    res.render("new");
})

module.exports = router;