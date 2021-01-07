const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv/config')
const authRoute = require('./Routes/Authentication')
const viewTraining = require('./Routes/AddTraining');

app.use(cors());
app.use(bodyparser.json());
app.use('/api/user',authRoute );
app.use('/api',viewTraining);





//db connection
mongoose.connect(process.env.DB_CONNECTION,
    {useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{
        console.log('DB CONNECTED');
    });


    //server listen
    app.listen(3600,()=>{
        console.log('server connected');
    })



    


