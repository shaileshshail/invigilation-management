const express = require('express');
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

require("dotenv").config();
try{
    require("./database/database");
}catch(err){
    console.log('Error in connecting to database');
}



const app = express();
const PORT = 5000 ;
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/auth',require('./routes/authRoutes'));

app.use('/classrooms',require('./routes/classroomRoutes'));
app.use('/staffs',require('./routes/staffRoutes'));
app.use('/events',require('./routes/eventRoutes'));
app.use('/eventdetails',require('./routes/eventDetailsRoutes'));


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})