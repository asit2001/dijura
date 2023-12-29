import { StoreState } from '@/store/store';
import { Transaction } from '@/store/types/TransactionState';
import { formateDate } from '@/utils/dateUtil';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

type AllTransactionTablePops = {
	show?: boolean;
};

export default function AllTransactionTable({ show }: AllTransactionTablePops) {
	const toast = useRef<Toast>(null);;
	const className = classNames({
		'': !!show,
		hidden: !show,
		'h-[600px]': true,
	});
	const  transactions= useSelector((state: StoreState) => state.transaction.transactions);


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
                    body={(transaction: Transaction) => formateDate(transaction.issueDate)}
					header='Issue Date'></Column>
			</DataTable>
			<Toast ref={toast} />
		</div>
	);
}
