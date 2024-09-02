import {User, unitUser, Users} from "./user.interface" //.ts?
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

// returns an array of unit users after finding, async func executes after....
// uses Object.values(users) to extract users from obj
export const findAll = async(): Promise<unitUser[]> => Object.values(users);

// returns the user data with unique id after....
export const findOne = async(id: string): Promise<unitUser> => users[id];

export const create = async(userData: unitUser): Promise<unitUser | null> => {
        // creates a random id with uuid package
        // checks if userid exists with findOne
        let id = random();
        let check_user = await findOne(id);

        //while userid exists, generates new id until unique one is found
        while(check_user){
                id = random();
                check_user = await findOne(id);
        }
        
        // hashes password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
         
        // saves hased password in unitUser obj
        const user: unitUser = {
                id: id,
                username: userData.username,
                email: userData.email,
                password: hashedPassword; // hashed saved
        };
        
        // unit user saved to the user object
        users[id] = user;
        saveUsers();
        return user;
};

export const findByEmail = async(user_email: string): Promise<null | unitUser> =>{
        // retrieves all users
        // finds users with matching email using .find
        const allUsers = await findAll();
        const getUser = allUsers.find(result => user_email === result.email);

        if(!getUser){
                return null;
        }

        return getUser;
}

export const comparePassword = async(email: string, supplied_password: string): Promise<null | unitUser> => {
        // retrieve user by email
        // because email and password login
        // use bcrypt.compare to compare hashed password with supplied
        const user = await findByEmail(email);
        const decryptPassword = await bcrypt.compare(supplied_password, user.password);

        if(!decryptPassword){
                return null;
        }

        return user
}





























