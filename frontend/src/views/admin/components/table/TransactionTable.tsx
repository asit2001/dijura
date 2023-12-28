import TransactionService from '@/services/transaction.service';
import { TRANSACTION_TYPES } from '@/store/config';
import { setAllTransactions } from '@/store/reducers/TransactionReducer';
import { StoreState } from '@/store/store';
import { Transaction } from '@/store/types/TransactionState';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type TransactionTablePops = {
	show?: boolean;
	transactionTypes?: TRANSACTION_TYPES;
};

export default function TransactionTable({ show, transactionTypes }: TransactionTablePops) {
	const toast = useRef<Toast>(null);
	const dispatch = useDispatch();
	const className = classNames({
		'': !!show,
		hidden: !show,
		'h-[600px]': true,
	});
	const {
		borrowedTransactions,
		returnedTransactions,
		transactions: allTransactions,
	} = useSelector((state: StoreState) => state.transaction);
	const transactions =
		transactionTypes === TRANSACTION_TYPES.BORROWED
			? borrowedTransactions
			: transactionTypes === TRANSACTION_TYPES.RETURNED
			? returnedTransactions
			: allTransactions;
	const updateTransaction = async (id: string, transactionTypes: TRANSACTION_TYPES) => {
		try {
			if (transactionTypes === TRANSACTION_TYPES.BORROWED) {
				transactionTypes = TRANSACTION_TYPES.RETURNED;
			} else {
				transactionTypes = TRANSACTION_TYPES.BORROWED;
			}
			await TransactionService.getInstance().updateTransactionByID(id, transactionTypes);
			const transactions = await TransactionService.getInstance().getAllTransaction();
			dispatch(setAllTransactions(transactions));
		} catch (error) {
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: error as string,
				life: 3000,
			});
		}
	};

	return (
		<div className={className}>
			<DataTable
				scrollable
				scrollHeight={'600px'}
				stripedRows
				value={transactions}
				tableClassName='min-w-[65vw] xl:w-[57vw]'
				rowClassName={() => 'cursor-pointer'}
			>
				<Column header='Sl. No.' body={(_, options) => options.rowIndex + 1}></Column>
				<Column
					header='Title of the book'
					body={(transaction: Transaction) => transaction.book.name}
					sortable
				></Column>
				<Column
					header='Author'
					body={(transaction: Transaction) => transaction.book.author}
				></Column>
				<Column
					header='User Name'
					body={(transaction: Transaction) => transaction.user.name}
				></Column>
				<Column
					header='User Email'
					body={(transaction: Transaction) => transaction.user.email}
				></Column>
				<Column
					header='Action'
					body={(transaction: Transaction) =>
						transaction.transactionType === TRANSACTION_TYPES.BORROWED ? (
							<button
								onClick={() =>
									updateTransaction(transaction.id, transaction.transactionType)
								}
								type='button'
								className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
							>
								Return
							</button>
						) : (
							<button
								onClick={() =>
									updateTransaction(transaction.id, transaction.transactionType)
								}
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
								type='button'
							>
								borrow
							</button>
						)
					}
				></Column>
			</DataTable>
			<Toast ref={toast} />
		</div>
	);
}
