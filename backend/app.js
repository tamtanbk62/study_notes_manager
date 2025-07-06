const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');
const userRouter = require ('./routes/userRoute');
const noteRouter = require ('./routes/noteRoute');

dotenv.config();

const app = express();

app.use (express.json ());
app.use (cors ());

app.use ('/', userRouter);
app.use ('/notes', noteRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to DB');
        app.listen(3000, () => {
            console.log('Server is running on 3000');
        });
        })
    .catch((err) => {
        console.log(err);
    })


    

