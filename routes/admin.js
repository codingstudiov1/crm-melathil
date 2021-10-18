var express=require('express');
var router=express.Router();
const viewData ={layout:'layouts/admin-layout'}

router.get('/login',(req,res,next)=>{
    res.render('admin/admin-login',viewData)
})




module.exports = router;
