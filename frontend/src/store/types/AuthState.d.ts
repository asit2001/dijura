import { USER_TYPES } from "src/config/const";

export interface AuthState extends SignUpProps{
    isLoading:boolean;
    errorSubmittingForm:string
}

export interface SignUpProps{
    phone: string;
	role: USER_TYPES;
    password:string;
    username:string;
    name:string;
    email:string;
}
export interface LoginProps{
    email:string,
    password:string
}