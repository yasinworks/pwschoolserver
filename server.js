import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './app/routes/auth.route.js';
import classRoute from './app/routes/class.route.js';
dotenv.config();

//VARIABLES
const app = express();
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
// const corsOptions = {
//     origin: 'http://localhost:4444'
// };


//CONNECT DB
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.xjfregt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error: \n", err));


// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
app.use(
    cookieSession({
        name: "session",
        secret: "COOKIE_SECRET",
        httpOnly: true
    })
);

//ROUTES

app.use('/api/auth', authRoute);
app.use('/api/classes', classRoute);



//START SERVER

app.listen(PORT, (err) => {
    if (err) (console.log(err));
    else {console.log(`Server is listening on port ${PORT}`)}
});