import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/store/store';
import { useUsers } from '@/hooks/useUsers';
import Loading from '@/views/components/loading';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import MemberModal from '@/views/admin/components/modal/MemberModal';
import { resetTransactionProps, setTransactionUser } from '@/store/reducers/TransactionReducer';
import { User } from '@/store/types/userState';

export default function BookTable({ show }: { show?: boolean }) {
	const { users } = useSelector((state: StoreState) => state.user);
	const toast = useRef<Toast>(null);
	const { isLoading, error } = useUsers();
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);

	const onHide = () => {
		dispatch(resetTransactionProps());
		setVisible(false);
	};

	if (error) {
		toast.current?.show({
			severity: 'error',
			summary: 'Error',
			detail: error as string,
			life: 3000,
		});
	}

	if (isLoading) {
		return <Loading />;
	}
	const className = classNames({
		'': !!show,
		hidden: !show,
		'h-[600px]': true,
	});
	return (
		<div className={className}>
			<DataTable
				onRowClick={(e) => {
                    const user = e.data as User
                    dispatch(setTransactionUser(user.id));
					setVisible(true);
				}}
				scrollable
				scrollHeight={'600px'}
				stripedRows
				value={users}
				tableClassName='min-w-[65vw] xl:w-[57vw]'
				rowClassName={() => 'cursor-pointer'}
			>
				<Column header='Sl. No.' body={(_, options) => options.rowIndex + 1}></Column>
				<Column field='name' header='Name'></Column>
				<Column field='username' header='Username' sortable></Column>
				<Column field='phone' header='Phone No.' sortable></Column>
				<Column field='email' header='Email' sortable></Column>
				<Column
					header='Action'
					body={() => (
						<span
							role='button'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
						>
							Assign
						</span>
					)}
				></Column>
			</DataTable>
			<Toast ref={toast} />
			<MemberModal visible={visible} onHide={onHide} />
		</div>
	);
}
