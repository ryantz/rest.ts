import {User, unitUser, Users} from "./users.interface";
import bcrypt from "bcryptjs"
import {v4 as random} from "uuid"
import fs from "fs"

let users: Users = loadUsers();

function loadUsers(): Users{
        try{
                const data = fs.readFileSync("./users.json", "utf-8");
                return JSON.parse(data);
        }catch(error){
                console.log(`Error ${error}`);
                return{};
        }
}

//using JSON.stringify to convert js to json data for users and save in users.json
function saveUsers(){
        try{
                fs.writeFileSync("./users.json", JSON.stringify(users), "utf-8");
                console.log(`Users saved successfully!`);
        }catch(error){
                console.log(`Error: ${error}`);
        }
}

export const findAll = async(): Promise<unitUser[]> => Object.values(users);

export const findOne = async(id: string): Promise<unitUser> => users[id];

export const create = async(userData: unitUser): Promise<unitUser | null> => {
        let id = random();
        let check_user = await findOne(id);
        while(check_user){
                id = random();
                check_user = await findOne(id);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const user: unitUser = {
                id: id,
                username: userData.username,
                email: userData.email,
                password: hashedPassword;
        };

        users[id] = user;
        saveUsers();
        return user;
};


