import Header from './Components/header';
import { Divider } from 'primereact/divider';
import BookCard from './Components/BookCard';
import { useBooks } from '@/hooks/useBooks';
import Loading from '@/views/components/loading';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { StoreState } from '@/store/store';
export default function HomePage() {
    const toast = useRef<Toast>(null);
    const {isLoading,error} = useBooks();
   const books = useSelector((state:StoreState)=>state.book.filteredBooks)
    if (isLoading) {
        return <Loading/>
    }
    if (error) {
		toast.current?.show({
			severity: 'error',
			summary: 'Error',
			detail: error as string,
			life: 3000,
		});
	}

	return (
		<div className='h-screen'>
			<div className='sticky top-0 bg-white'>
			<Header />
			<Divider />
			</div>
			<div className='flex justify-center items-center'>
				<div className='max-w-[1200px] grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{
                        books.map(book=>(<BookCard key={book.id} {...book}  />))
                    }
				</div>
			</div>
            <Toast ref={toast} />
		</div>
	);
}
