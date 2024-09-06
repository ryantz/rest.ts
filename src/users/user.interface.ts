// defining the structure of data 
// for the user database
//id(string), username(string),
//email(number), password(string)

// basic structure of a user
export interface User {
        username: string,
        email: string,
        password: string;
}

// unique identifier for User
export interface unitUser extends User {
        id: string;
}

// For a collection of users
// key is a string
// value is a unitUser object
export interface Users {
        [key: string]: unitUser;
}

