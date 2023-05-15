import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/connectdb.js';

import routerss from './routes/userroutes.js';

const app = express();
const port = process.env.PORT;
const DataBaseURL = process.env.DataBase;

app.use(cors());

connectDb(DataBaseURL);

app.use(express.json());

app.use("/api/users", routerss)

app.listen(port, () => {
    console.log("server working")
})
