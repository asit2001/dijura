import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/store/store';
import { useBooks } from '@/hooks/useBooks';
import Loading from '@/views/components/loading';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { resetBookProps, setBookProps } from '@/store/reducers/BookReducer';
import { BookResponse } from '@/store/types/bookState';
import BookModal from '@/views/admin/components/modal/BookModal';
import { Tag } from 'primereact/tag';
import classNames from 'classnames';
import { BsPlus } from 'react-icons/bs';

export default function BookTable({ show }: { show?: boolean }) {
	const books = useSelector((state: StoreState) => state.book.books);
	const toast = useRef<Toast>(null);
	const { isLoading, error } = useBooks();
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);

	const onHide = () => {
		dispatch(resetBookProps());
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
        'h-[600px]':true
	});
	return (
		<div className={className}>
			<div className='p-5 flex justify-end items-center text-Tblue h-6'>
				<BsPlus />
				<p onClick={() => setVisible(true)} role='button'>
					Add new book
				</p>
			</div>
			<DataTable
				onRowClick={(e) => {
					dispatch(setBookProps(e.data as BookResponse));
					setVisible(true);
				}}
				scrollable
				scrollHeight={'600px'}
				stripedRows
				value={books}
				tableClassName='min-w-[65vw] xl:w-[57vw]'
				rowClassName={() => 'cursor-pointer'}
			>
				<Column header='Sl. No.' body={(_, options) => options.rowIndex + 1}></Column>
				<Column
					field='imageUrl'
					header='Book picture'
					body={(book: BookResponse) => (
						<Image
							src={
								book.imageUrl ??
								'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
							}
							alt={book.name}
							width='50'
							preview
						/>
					)}
				></Column>
				<Column field='name' header='Title of the book' sortable></Column>
				<Column field='author' header='Author' sortable></Column>
				<Column
					className='text-center'
					field='available'
					header='Available'
					sortable
					body={(book: BookResponse) =>
						book.available ? (
							<Tag className='px-5 py-2' severity='success' value='YES' rounded />
						) : (
							<Tag className='px-5 py-2' severity='danger' value='NO' rounded />
						)
					}
				></Column>
                <Column
					header='Action'
					body={() => (
						<span
							role='button'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
						>
							Update
						</span>
					)}
				></Column>
			</DataTable>
			<Toast ref={toast} />
			<BookModal visible={visible} onHide={onHide} />
		</div>
	);
}
