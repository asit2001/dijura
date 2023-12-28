import IBook from "@/types/book";
import mongoose,{Schema} from "mongoose";

const bookSchema = new Schema<IBook>({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    },
    imageUrl:{
        type:String
    }
});

const bookModel = mongoose.model<IBook>("Book",bookSchema);
export default bookModel;