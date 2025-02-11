const express = require('express');
// const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
// const path = require('path');
const cors = require('cors');
const EmployeeModel = require('./models/user');

// enviourment variables
// dotenv.config();

// middlewares
app.use(express.json());
app.use(cors()); 


// routes
// const userRoutes = require('./routes/user.routes');
// const testRoutes = require('./routes/test.routes');

/* app.use('/public', express.static(path.join(__dirname, "uploads")));
app.use('/api', userRoutes)
app.use('/api', testRoutes) */

//new connection
 mongoose.connect("mongodb://127.0.0.1:27017/employee")

 app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json ("Incorrect Password")
            }  
        } else {
            res.json("No Record Found")
        }
    })
 })

 app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
 })

app.listen(3001, () => {
    console.log("server is running")
})


// mongodb connection

 /* const connectDB = (dburl) => {
    return mongoose.connect(dburl, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // // useCreateIndex: true,
        // // useFindAndModify: false,
    }).then(() => {
        console.log('Database Connected');
    })
}

const start = async () => {
    try {
        await connectDB(process.env.dburl);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
*/