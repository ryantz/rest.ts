// import dependencies that was downloaded from npm previously
// express, dontenv, helmet, cors
// http-status-codes, uuid, bcryptjs

import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import {userRouter} from "./users/users.routes"

// loading environmental variables from local .env

dotenv.config();

// check if PORT env is defined
if(!process.env.PORT){
        console.log("PORT value is not specified...");
}

// as string ts construct, parseInt(, radix)
const PORT = parseInt(process.env.PORT as string, 10);

// creating an instance of express
const app = express();

// adding middlewear functions to the express app
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());

// routes
app.use('/', userRouter);

// listening on port for instructions
app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
});

