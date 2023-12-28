import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email address').required('Email is required'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
});

export const signUpValidationSchema = Yup.object().shape({
	phone: Yup.string()
		.min(10, 'Phone must be 10 digits without leading zero')
		.max(10, 'Phone must be 10 digits without leading zero')
		.required('Phone is required'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
	username: Yup.string().required('Username is required'),
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email address').required('Email is required'),
});
export const createBookValidationSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Invalid book title').required('Book title is required'),
	author: Yup.string().min(2, 'Invalid author name').required('Author name is required'),
	available: Yup.boolean().required("Select book's available"),
});
export const createTransactionValidationSchema = Yup.object().shape({
	book: Yup.object().required('Select a book to assign'),
	dueDate:Yup.date().required('Due date is required')
});
