import ITransaction from "@/types/transaction";
import mongoose,{Schema} from "mongoose";
import {addDays} from "date-fns"
import { TRANSACTION_TYPES } from "@/config/const";


const transactionSchema = new Schema<ITransaction>({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    book:{
        type: Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    dueDate:{
        type:Date,
        default:addDays(new Date(), 1) //next day 
    },
    transactionType:{
        type:String,
        enum:TRANSACTION_TYPES,
        required:true
    },
    issueDate:{
        type:Date,
        default:new Date()
    }
});

const transactionModal = mongoose.model("Transaction",transactionSchema);

export default transactionModal;