import { Book } from '@/store/types/bookState';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useRef, useState } from 'react';
import { createBookValidationSchema } from 'src/schema';
import Spinner from '../../../components/spinner/Spinner';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import BookService from '@/service/book.service';
import { Toast } from 'primereact/toast';
import { dropDownOptions } from '@/config/const';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/store/store';
import { setBooks } from '@/store/reducers/BookReducer';

interface BookModalProps {
	visible: boolean;
	onHide(): void;
}

export default function BookModal({ visible, onHide }: BookModalProps) {
	const [file, setFile] = useState<File>();
	const [isLoading, setIsLoading] = useState(false);
	const bookService = BookService.getInstance();
	const toast = useRef<Toast>(null);
	const initialValues = useSelector((state: StoreState) => state.book.bookProps);
	const dispatch = useDispatch();
	const createBook = async (bookDetails: Book, file?: File) => {
		const { id } = await bookService.createBook({
			author: bookDetails.author,
			available: bookDetails.available,
			name: bookDetails.name,
		});
		if (file) {
			await bookService.uploadBookImage(id, file);
		}
	};
	const updateBook = async (id: string, bookDetails: Book, file?: File) => {
		await bookService.updateBookById(id, bookDetails);
		if (file) {
			await bookService.uploadBookImage(id, file);
		}
	};

	return (
		<Dialog
			headerClassName='text-center'
			header='Add new Book'
			className='w-[100vw] md:w-[450px]'
			visible={visible}
			onHide={onHide}
		>
			<Formik
				initialValues={initialValues}
				validationSchema={createBookValidationSchema}
				onSubmit={async (values) => {
					setIsLoading(true);
					try {
						const { id, ...bookDetails } = values;
						if (id != '') {
							await updateBook(id, bookDetails, file);
						} else {
							await createBook(bookDetails);
						}
						setIsLoading(false);
						setFile(undefined);
						onHide();
						const books = await bookService.getAllBooks();
						dispatch(setBooks(books));
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
							book title
						</label>
						<InputText
							className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
							name='name'
							type='text'
							id='name'
							value={props.values.name}
							onChange={props.handleChange}
						/>
						<ErrorMessage name='name' component='div' className='text-TlightRed' />
						<label className='block text-[15px] pt-3 capitalize' htmlFor='name'>
							author
						</label>
						<InputText
							className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
							name='author'
							type='text'
							id='author'
							value={props.values.author}
							onChange={props.handleChange}
						/>
						<ErrorMessage name='author' component='div' className='text-TlightRed' />
						<label className='block text-[15px] pt-3 capitalize' htmlFor='available'>
							available
						</label>
						<Dropdown
							inputId='available'
							name='available'
							className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
							value={props.values.available ? dropDownOptions[0] : dropDownOptions[1]}
							options={dropDownOptions}
							optionLabel='available'
							placeholder='book status'
							onChange={(e) => {
								props.setFieldValue('available', e.value.available === 'YES');
							}}
						/>
						<div className='pt-3 flex justify-between px-4'>
							<Image
								src={
									file
										? URL.createObjectURL(file)
										: props.values.imageUrl
										? props.values.imageUrl
										: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
								}
								width='80'
								height='60'
								preview
							/>

							<FileUpload
								onSelect={(e) => {
									setFile(e.files[0]);
								}}
						
								onClear={() => {
									setFile(undefined);
								}}
								mode='basic'
								accept='image/jpeg, image/png'
								chooseOptions={{
									icon: 'pi pi-fw pi-images',
									iconOnly: true,
									className:
										'custom-choose-btn p-button-rounded p-button-outlined',
								}}
								uploadLabel={"a"}
							/>
						</div>

						<div className='flex justify-end gap-5 pt-7'>
							<Button
								type='button'
								onClick={onHide}
								label='cancel'
								severity='secondary'
							/>
							<Button disabled={isLoading} type='submit' severity='success'>
								<Spinner
									style={{ display: isLoading ? 'initial' : 'none' }}
									height='16'
								/>
								{props.values.id !== '' ? 'Update':'Create'}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
			<Toast ref={toast} />
		</Dialog>
	);
}
