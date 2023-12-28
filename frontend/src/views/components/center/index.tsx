import { HTMLAttributes } from 'react';

interface indexPops extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
}

export default function Center({ children, className, ...rest }: indexPops) {
	return (
		<div className={'flex justify-center items-center ' + className} {...rest}>
			{children}
		</div>
	);
}
