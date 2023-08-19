const express = require('express');

require("dotenv").config();
require("./database/database");



const app = express();

const PORT = 5000 ;

app.use('/classrooms',require('./routes/classroomRoutes'));
app.use('/staff',require('./routes/staffRoutes'));
app.use('/event',require('./routes/eventRoutes'));

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})