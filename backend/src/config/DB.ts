import mongoose from "mongoose";
import { IS_TEST, MONGODB_TEST_URI, MONGODB_URI } from "@/config/const";

export default async function connect(){
   try{
      await mongoose.connect(IS_TEST ? MONGODB_TEST_URI: MONGODB_URI);
   }catch(e){
    console.log(e);
   }

}