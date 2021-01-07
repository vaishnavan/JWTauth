const router = require('express').Router();

const verify = require('./verify');


router.get('/viewTrainings', verify , (req,res)=>{


    console.log(req)
    //call db to get all the trainings...
    res.send("DATA CAME BACK FROM DATABASE ...with user unique iD: " + req);
}); 

module.exports = router;