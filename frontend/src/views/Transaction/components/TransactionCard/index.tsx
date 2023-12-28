import { TRANSACTION_TYPES } from '@/store/config';
import { Transaction } from '@/store/types/TransactionState';
import { Card, Rating } from 'flowbite-react';
import { Tag } from 'primereact/tag';
import { formateDate } from 'src/utils/dateUtil';

export default function TransactionCard({ book, dueDate, transactionType }: Transaction) {
	return (
		<Card className='w-full'>
			<div className='flex gap-3 md:gap-6'>
				<img
					alt=''
					className='object-contain object-left-top md:w-[200px] md:h-[350px]'
					src={book.imageUrl ? book.imageUrl : ''}
				/>
				<div className='flex flex-col w-full'>
					<div className='w-full flex justify-between'>
						{/* details */}
						<div className='flex flex-col'>
							<h2 className='font-semibold text-lg md:text-2xl text-Tblack'>
								{book.name}
							</h2>
							<p className='font-medium md:text-lg text-Tgray px-1'>{book.author}</p>
							<Rating className='pt-4'>
								<Rating.Star />
								<Rating.Star />
								<Rating.Star />
								<Rating.Star />
								<Rating.Star filled={false} />
							</Rating>
						</div>
						<div className='flex flex-col gap-2 md:pr-5'>
							<p className='font-medium md:text-lg text-Tblack uppercase'>status</p>
							{transactionType === TRANSACTION_TYPES.BORROWED ? (
								<Tag severity='info'>BORROWED</Tag>
							) : (
								<Tag severity='success'>RETURNED</Tag>
							)}
						</div>
					</div>
					<p className='font-medium md:text-lg text-Tgray px-1 py-2'>
						Due date : {formateDate(dueDate)}
					</p>
				</div>
			</div>
		</Card>
	);
}
