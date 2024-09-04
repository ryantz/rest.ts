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
                const allUsers: unitUser[] = await database.findAll();

                if(!allUsers){
                        return res.status(StatusCodes.NOT_FOUND).json({msg: `No users currently.....`});
                }

                return res.status(StatusCodes.OK).json({total_users: allUsers.length, allUsers});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

// get method for 1 user
userRouter.get("/users/:id", async(req: Request, res: Response) => {
        try{
                const oneUser: unitUser = await database.findOne(req.params.id);

                if(!oneUser){
                        return res.status(StatusCodes.NOT_FOUND).json({error: `User not found...`});
                }

                return res.status(StatusCodes.OK).json({oneUser});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

// post method for registering new users
userRouter.post("/register", async(req: Request, res: Response) => {
        try{
                const {username, email, password} = req.body;

                if(!username || !email || !password){
                        return res.status(StatusCodes.BAD_REQUEST).json({error: `Please provide all the required parameters for registering...`});
                }

                const user = await database.findByEmail(email);

                if(user){
                        return res.status(StatusCodes.BAD_REQUEST).json({error: `Current email is already registered`});
                }

                const newUser = await database.create(req.body);

                return res.status(StatusCodes.CREATED).json({newUser});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

// post method for login
userRouter.post("/login", async(req: Request, res: Response) => {
        try{
                const {email, password} = req.body;

                if(!email || !password){
                        return res.status(StatusCodes.BAD_REQUEST).json({error: `Please provide all required parameters for login...`});
                }

                const user = await database.findByEmail(email);

                if(!user){
                        return res.status(StatusCodes.BAD_REQUEST).json({error: `No user exists with this email provided...`});
                }

                const correctPassword = await database.comparePassword(email, password);

                if(!correctPassword){
                        return res.status(StatusCodes.BAD_REQUEST).json({error: `Incorrect password entered!...`});
                }

                return res.status(StatusCodes.OK).json({user});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

// put method to update user details
userRouter.put("/user/:id", async(req: Request, res: Response) => {
        try{
                const {username, email, password} = req.body;

                const getUser = await database.findOne(req.params.id);

                if(!username || !password || !email){
                        return res.status(401).json({error: `Please provide all the required parameters for updating...`});
                }

                if(!getUser){
                        return res.status(404).json({error: `There is no user with id ${req.params.id}`});
                }
                
                const updateUser = await database.update((req.params.id), req.body)

                return res.status(201).json({updateUser});
        }catch(error){
                console.log(error);
                return res.status(500).json({error});
        }
});

// delete method for deleting users
userRouter.delete("/user/:id", async(req: Request, res: Response) => {
        try{
                // check if id exists
                const id = (req.params.id);
        
                const user = await database.findOne(id);

                if(!user){
                        return res.status(StatusCodes.NOT_FOUND).json({error: `User does not exist!`});
                }
        
                await database.remove(id);
        
                return res.status(StatusCodes.OK).json({msg: `User deleted!`});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});




