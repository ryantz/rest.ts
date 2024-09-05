import {Product, unitProduct, Products} from "./product.interface";
import {v4 as random} from "uuid";
import fs from "fs";

let products = loadProducts();

function loadProducts(): Products{
        try{
                const data = fs.readFileSync("./products.json", "utf-8");
                return JSON.parse(data);
        }catch(error){
                console.log(`Error ${error}`);
                return{};
        }
}

function saveProducts(){
        try{
                fs.writeFileSync("./products.json", JSON.stringify(products), "utf-8");
                console.log("Product/s have been saved successfully");
        }catch(error){
                console.log(`Error ${error}`);
        }
}

export const findAll = async(): Promise<unitProduct[]> => Object.values(products);

export const findOne = async(id: string): Promise<unitProduct> => products[id];

export const create = async(productInfo: Product): Promise<null | unitProduct> => {
        
        let id = random();

        let product = await findOne(id);

        while(product){
                id = random();
                product = await findOne(id);
        }

        products[id] = {
                id: id,
                ...productInfo
        }

        saveProducts();
        
        return products[id];
}

export const update = async(id: string, updateValues: Product): Promise<unitProduct | null> => {
        const prod = await findOne(id);
        
        if(!prod){
                return null
        }

        products[id] = {
                id,
                ...updateValues
        }

        saveProducts();
        
        return products[id];
}

export const remove = async(id: string): Promise<null | void> => {

        const product = await findOne(id)

        if(!product){
                return null;
        }

        delete products[id];
        
        saveProducts();
}

