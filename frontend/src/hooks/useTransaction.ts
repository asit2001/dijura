
import TransactionService from "@/services/transaction.service";
import { setAllTransactions, setUserTransactions } from "@/store/reducers/TransactionReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useTransactions(){
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const AllTransactions = async () => {
		setLoading(true);
		try {
			const transactions = await TransactionService.getInstance().getAllTransaction();
            
            dispatch(setAllTransactions(transactions));
            
		} catch (err: unknown) {
            if (typeof err === 'string') {
                setError(err);
            }
		} finally {
			setLoading(false);
		}
	};

    useEffect(()=>{
        AllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return {isLoading,error};
}
export function useUserTransactions(){
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const getUserTransactions = async () => {
		setLoading(true);
		try {
			const transactions = await TransactionService.getInstance().getUserTransaction();
            
            dispatch(setUserTransactions(transactions));
            
		} catch (err: unknown) {
            if (typeof err === 'string') {
                setError(err);
            }
		} finally {
			setLoading(false);
		}
	};

    useEffect(()=>{
        getUserTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return {isLoading,error};
}
