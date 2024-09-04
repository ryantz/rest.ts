import express, {Request, Response} from "express"
import {unitUser, User} from "./user.interface"
import {StatusCodes} from "http-status-codes"
import * as database from "./user.database"

// creating a router instance to be imported later
export const userRouter = express.Router()

// get requests for all users
userRouter.get("/users", async(req: Request, res: Response) => {
        try{
                // all users is an array of ids
                // use findall function to find all
                const allUsers: unitUsers[] = await.database.findAll();

                if(!allusers){
                        return res.status(StatusCodes.NOT_FOUND).json({msg: `No users currently.....`});
                }

                return res.status(StatusCodes.OK).json({total_users: allUsers.length, allUsers});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});




