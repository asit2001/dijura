import BookService from "@/services/book.service";
import { setBooks } from "@/store/reducers/BookReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useBooks(){
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const getAllBooks = async () => {
		setLoading(true);
		try {
			const books = await BookService.getInstance().getAllBooks();
            dispatch(setBooks(books));
            
		} catch (err: unknown) {
			if (typeof err === 'string') {
                setError(err);
            }
		} finally {
			setLoading(false);
		}
	};

    useEffect(()=>{
        getAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return {isLoading,error};
}
