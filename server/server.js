const express = require('express');
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require("dotenv").config();
try{
    require("./database/database");
}catch(err){
    console.log('Error in connecting to database');
}

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis: ["./routes/*.js"]

}

const specs = swaggerJsDoc(options)


const app = express();
const PORT = process.env.PORT || 5000 ;
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/auth',require('./routes/authRoutes'));

app.use('/classrooms',require('./routes/classroomRoutes'));
app.use('/staffs',require('./routes/staffRoutes'));
app.use('/events',require('./routes/eventRoutes'));
app.use('/eventdetails',require('./routes/eventDetailsRoutes'));
app.use('/staffhome',require('./routes/staffHomeRoutes'));

app.listen(PORT,()=>{
    console.log(`Server is running on port :${PORT}`);
})