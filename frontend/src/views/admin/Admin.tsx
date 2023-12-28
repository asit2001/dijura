import Header from '@/views/admin/components/header';
import { Divider } from 'primereact/divider';
import Center from '@/views/components/center';
import Sidebar from './components/sidebar';
import {
	BookTable,
	BorrowedBookTable,
	MemberTable,
	ReturnedBookTable,
	TransactionTable,
} from './components/table';
import { useRef, useState } from 'react';
import BookModal from './components/modal/BookModal';
import { useSelector } from 'react-redux';
import { StoreState } from '@/store/store';
import { SELECTED_MENU, TRANSACTION_TYPES } from '@/store/config';
import { useTransactions } from '@/hooks/useTransaction';
import Loading from '@/views/components/loading';
import { Toast } from 'primereact/toast';

export default function Admin() {
	const menu = useSelector((state: StoreState) => state.other.selectedMenu);
	const [visible, setVisible] = useState<boolean>(false);
	const { isLoading, error } = useTransactions();
	const toast = useRef<Toast>(null);
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
	return (
		<Center className='h-screen'>
			<div className='flex flex-col bg-white border border-gray-200 rounded-lg shadow'>
				<Header />
				<Divider className='m-0' />
				<div className='flex h-full'>
					<Sidebar />
					<BookTable show={menu === SELECTED_MENU.BOOK} />
					<MemberTable show={menu === SELECTED_MENU.MEMBER} />
					<BorrowedBookTable
						show={menu === SELECTED_MENU.BORROWED}
						transactionTypes={TRANSACTION_TYPES.BORROWED}
					/>
					<ReturnedBookTable
						show={menu === SELECTED_MENU.RETURNED}
						transactionTypes={TRANSACTION_TYPES.RETURNED}
					/>
					<TransactionTable show={menu === SELECTED_MENU.TRANSACTION} />
				</div>
			</div>
			<BookModal onHide={() => setVisible(false)} visible={visible} />
			<Toast ref={toast} />
		</Center>
	);
}
