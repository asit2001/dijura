import { BookResponse } from '@/store/types/bookState';
import { Card, Rating } from 'flowbite-react';

export default function BookCard({ author, name, available, imageUrl }: BookResponse) {
	return (
		<Card
			renderImage={() => (
				<img
					alt=''
					className='object-contain h-[200px] pt-2 object-center'
					src={
						imageUrl !== ''
							? imageUrl
							: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
					}
				/>
			)}
		>
			<div className=''>
				<h2 className='text-xl capitalize font-semibold overflow-hidden max-w-[350px] text-nowrap text-ellipsis'>
					{name}
				</h2>
				<p className='pt-[2px] text-TdarkGray'>{author}</p>
			</div>
			<Rating>
				<Rating.Star />
				<Rating.Star />
				<Rating.Star />
				<Rating.Star />
				<Rating.Star filled={false} />
			</Rating>
			<p className='font-bold text-xl uppercase'>{available ? 'available' : 'unavailable'}</p>
		</Card>
	);
}
