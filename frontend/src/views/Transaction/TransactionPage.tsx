import { Divider } from 'primereact/divider';
import Header from './components/header';
import TransactionCard from './components/TransactionCard';
import { useSelector } from 'react-redux';
import { StoreState } from '@/store/store';
import { useUserTransactions } from '@/hooks/useTransaction';
import Loading from '@/components/loading';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function TransactionPage() {
    const toast = useRef<Toast>(null)
    const {isLoading,error} = useUserTransactions();
    const transactions = useSelector((state:StoreState)=>state.transaction.filteredUserTransactions);

    if (error) {
        toast.current?.show({
			severity: 'error',
			summary: 'Error',
			detail: error as string,
			life: 3000,
		});
    }

    if (isLoading) {
        return <Loading/>
    }

	return (
		<div className='h-screen'>
            <div className='sticky top-0 bg-white'>
			<Header />
			<Divider />
            </div>
			<div className='flex justify-center items-center'>
				<div className='max-w-[800px] w-full flex flex-col gap-2'>
                    {transactions.length ===0 && <p className='text-center text-lg font-medium text-TdarkGray'>No transactions found</p>}
                    {
                        transactions.map((transaction)=><TransactionCard key={transaction.id} {...transaction}/>)
                    }
					
				</div>
                <Toast ref={toast}/>
			</div>
		</div>
	);
}
