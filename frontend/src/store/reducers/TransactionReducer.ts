import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreNames, TRANSACTION_TYPES } from "../config";
import { Transaction, TransactionProps, TransactionState } from "../types/TransactionState";

const initialState:TransactionState = {
    transactions: [],
    transaction: {
        id: "",
        user: "",
        book: "",
        transactionType: TRANSACTION_TYPES.BORROWED
    },
    borrowedTransactions: [],
    returnedTransactions: [],
    userTransactions: [],
    filteredUserTransactions: []
}

const TransactionSlice = createSlice({
    name: StoreNames.TRANSACTION,
    initialState,
    reducers: {
        reset: (state) => {
            state.borrowedTransactions = initialState.borrowedTransactions;
            state.returnedTransactions = initialState.returnedTransactions;
            state.transaction = initialState.transaction;
            state.transactions = initialState.transactions;
            state.userTransactions = initialState.userTransactions;
        },
        setAllTransactions(state,action:PayloadAction<Transaction[]>){
            state.transactions = action.payload;
            state.borrowedTransactions = action.payload.filter(({transactionType})=>transactionType === TRANSACTION_TYPES.BORROWED);
            state.returnedTransactions = action.payload.filter(({transactionType})=>transactionType === TRANSACTION_TYPES.RETURNED);
        },
        setTransaction(state,action:PayloadAction<TransactionProps>){
            state.transaction = action.payload;
        },
        resetTransactionProps(state){
            state.transaction = initialState.transaction;
        },
        setTransactionId(state,action:PayloadAction<string>){
            state.transaction.id = action.payload;
        },
        setTransactionUser(state,action:PayloadAction<string>){
            state.transaction.user = action.payload;
        },
        setUserTransactions(state,action:PayloadAction<Transaction[]>){
            state.userTransactions = action.payload;
            state.filteredUserTransactions = action.payload;
        },
        setFilteredTransactions(state,action:PayloadAction<string|Transaction[]>){
            if (typeof action.payload === 'string') {
                const searchText = action.payload.toLowerCase();
                state.filteredUserTransactions = state.userTransactions.filter(({book})=>(book.author.toLowerCase().includes(searchText)||book.name.toLowerCase().includes(searchText)))
            }
        }
    },
});

export const {
   reset,
   setAllTransactions,
   setTransaction,
   resetTransactionProps,
   setTransactionId,
   setTransactionUser,
   setUserTransactions,
   setFilteredTransactions
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
