import express, {Request, Response} from "express"
import {Product, unitProduct} from "./product.interface"
import * as database from "./product.database"
import {StatusCodes} from "http-status-codes"

export const prodRouter = express.Router();

// retrieve all product data
prodRouter.get("/products", async(req: Request, res: Response) => {
        try{
                const allProd: unitProduct[] = await database.findAll();

                if(!allProd){
                        return res.status(StatusCodes.NOT_FOUND).json({msg: `No products currently...`});
                }

                return res.status(StatusCodes.OK).json({total_products: allProd.length, allProd});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

prodRouter.get("/products/:id", async(req: Request, res: Response) => {
        try{
                const oneProd: unitProduct = await database.findOne(req.params.id);

                if(!oneProd){
                        return res.status(StatusCodes.NOT_FOUND).json({error: `Product not found...`});
                }
                
                return res.status(StatusCodes.OK).json({oneProd});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

prodRouter.post("/listing", async(req: Request, res: Response) => {
        try{
                const {name, price, quantity} = req.body;

                if(!name || !price || !quantity){
                        return res.status(StatusCodes.BAD_REQUEST).json({error: `Please provide all the relevant details of the product to list!`});
                }

                const newProd = await database.create({...req.body});
                return res.status(StatusCodes.CREATED).json({newProd});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

prodRouter.put("/products/:id", async(req: Request, res: Response) => {
        try{
                const id = req.params.id;

                const newProd = req.body;

                const getProd = await database.findOne(id);

                if(!getProd){
                        return res.status(StatusCodes.NOT_FOUND).json({error:`There is no such product!`});
                }

                const updateProd = await database.update(id, newProd);
                return res.status(StatusCodes.OK).json({updateProd});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

prodRouter.delete("/products/:id", async(req: Request, res: Response) => {
        try{
                const getProd = await database.findOne(req.params.id);

                if(!getProd){
                        return res.status(StatusCodes.NOT_FOUND).json({error:`There is no such product to delete!`})
                }

                await database.remove(req.params.id);
                return res.status(StatusCodes.OK).json({msg: `Product is deleted`});
        }catch(error){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
        }
});

                
