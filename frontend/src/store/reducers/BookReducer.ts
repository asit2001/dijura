import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import { BookResponse, bookState } from '../types/bookState';

const initialState: bookState = {
	bookProps: {
		id: '',
		name: '',
		author: '',
		available: true,
	},
	books: [],
	isLoading: false,
	filteredBooks: [],
};

const BookSlice = createSlice({
	name: StoreNames.BOOK,
	initialState,
	reducers: {
		reset: (state) => {
			state.bookProps = initialState.bookProps;
			state.books = initialState.books;
			state.isLoading = initialState.isLoading;
			state.filteredBooks = initialState.filteredBooks;
		},
		setBookID(state, actions: PayloadAction<string>) {
			state.bookProps.id = actions.payload;
		},
		setBookName(state, actions: PayloadAction<string>) {
			state.bookProps.name = actions.payload;
		},
		setBookAuthor(state, actions: PayloadAction<string>) {
			state.bookProps.author = actions.payload;
		},
		setBookImage(state, actions: PayloadAction<string>) {
			state.bookProps.imageUrl = actions.payload;
		},
		setBookAvailable(state, actions: PayloadAction<boolean>) {
			state.bookProps.available = actions.payload;
		},
		setIsLoading(state, actions: PayloadAction<boolean>) {
			state.isLoading = actions.payload;
		},
		setBooks(state, actions: PayloadAction<BookResponse[]>) {
			state.books = actions.payload;
			state.filteredBooks = actions.payload;
		},
		setBookProps(state, action: PayloadAction<BookResponse>) {
			state.bookProps = action.payload;
		},
		resetBookProps(state) {
			state.bookProps = initialState.bookProps;
		},
		setFilterBook(state, action: PayloadAction<string | BookResponse[]>) {
			if (typeof action.payload === 'string') {
				const searchText = action.payload.toLowerCase();
				state.filteredBooks = state.books.filter(
					({ name, author }) =>
						name.toLowerCase().includes(searchText) ||
						author.toLowerCase().includes(searchText)
				);
			} else {
				state.filteredBooks = action.payload;
			}
		},
	},
});

export const {
	reset,
	setIsLoading,
	setBookAuthor,
	setBookAvailable,
	setBookID,
	setBookImage,
	setBookName,
	setBooks,
	resetBookProps,
	setBookProps,
	setFilterBook,
} = BookSlice.actions;

export default BookSlice.reducer;
