import { USER_TYPES } from "src/config/const";

export  interface userState{
	user:User
    isLoading:boolean
    errorFetchingUserDetails:string
    users:User[],
    profile:User
}
export interface User{
    phone: number;
    username:string;
    name:string;
    email:string;
    id:string;
    role:USER_TYPES
}