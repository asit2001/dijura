import { ProgressSpinner } from 'primereact/progressspinner';

export default function Loading() {
	return (
		<div className='flex justify-center items-center bg-white inset-0 fixed z-50'>
			<div>
				<ProgressSpinner aria-label='Loading' />
                <p className='text-center font-semibold text-xl'>Loading...</p>
			</div>
		</div>
	);
}
