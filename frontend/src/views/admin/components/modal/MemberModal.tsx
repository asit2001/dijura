import { ErrorMessage, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { useRef, useState } from 'react';
import { createTransactionValidationSchema } from 'src/schema';
import Spinner from '../../../components/spinner/Spinner';

import Transaction from '@/service/transaction.service';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/store/store';

import { TransactionProps } from '@/store/types/TransactionState';
import { Calendar } from 'primereact/calendar';
import { BookResponse } from '@/store/types/bookState';
import { TRANSACTION_TYPES } from '@/store/config';
import { setAllTransactions } from '@/store/reducers/TransactionReducer';

interface MemberModalProps {
	visible: boolean;
	onHide(): void;
}

interface formikValues {
	book: BookResponse | null;
	dueDate: Date;
}

export default function MemberModal({ visible, onHide }: MemberModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const transaction = Transaction.getInstance();
	const toast = useRef<Toast>(null);
	const books = useSelector((state: StoreState) => state.book.books);
	const { user } = useSelector((state: StoreState) => state.transaction.transaction);
	const dispatch = useDispatch();
	const createTransaction = async (details: Omit<TransactionProps, 'id'>) => {
		await transaction.createTransaction({
			book: details.book,
			transactionType: details.transactionType,
			dueDate: details.dueDate,
			user: details.user,
		});
	};

	const today = new Date();

	const initialValues: formikValues = {
		book: null,
		dueDate: today,
	};

	return (
		<Dialog
			headerClassName='text-center'
			header='Assign new Book'
			className='w-[100vw] md:w-[450px]'
			visible={visible}
			onHide={onHide}
		>
			<Formik
				initialValues={initialValues}
				validationSchema={createTransactionValidationSchema}
				onSubmit={async (value) => {
					setIsLoading(true);
					try {
						const bookId = value.book?.id as string;
						await createTransaction({
							book: bookId,
							transactionType: TRANSACTION_TYPES.BORROWED,
							user: user,
						});
						setIsLoading(false);
						onHide();
						const transactions = await transaction.getAllTransaction();
						dispatch(setAllTransactions(transactions));
					} catch (err) {
						setIsLoading(false);
						onHide();
						toast.current?.show({
							severity: 'error',
							summary: 'Error',
							detail: err as string,
							life: 3000,
						});
					}
				}}
			>
				{(props) => (
					<Form>
						<label className='block text-[15px] pt-3 capitalize' htmlFor='name'>
							book
						</label>
						<Dropdown
							value={props.values.book}
							onChange={(e) => props.setFieldValue('book', e.value)}
							options={books}
							optionLabel='name'
							placeholder='Select a book'
							filter
							className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
						/>
						<ErrorMessage name='book' component='div' className='text-TlightRed' />

						<label className='block text-[15px] pt-3 capitalize' htmlFor='available'>
							select due Date
						</label>
						<Calendar
							minDate={today}
							value={props.values.dueDate}
							onChange={(e) => props.setFieldValue('dueDate', e.value)}
							showIcon
							className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
						/>
						<ErrorMessage name='dueDate' component='div' className='text-TlightRed' />
						<div className='flex justify-end gap-5 pt-7'>
							<Button
								type='button'
								onClick={onHide}
								label='cancel'
								severity='secondary'
							/>
							<Button disabled={isLoading} type='submit' severity='success'>
								<Spinner
									style={{
										display: isLoading ? 'initial' : 'none',
										marginRight: '5px',
									}}
									height='16'
								/>
								Assign
							</Button>
						</div>
					</Form>
				)}
			</Formik>
			<Toast ref={toast} />
		</Dialog>
	);
}
