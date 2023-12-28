import { RxDragHandleDots2 } from 'react-icons/rx';
import { BsFillCircleFill } from 'react-icons/bs';
import classNames from 'classnames';
import { HtmlHTMLAttributes, useRef } from 'react';
import { SELECTED_MENU } from '@/store/config';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/store/store';
import { setSelectedMenu } from '@/store/reducers/OtherReducer';
import { Toast } from 'primereact/toast';
import LogOutBtn from '@/views/components/logoutBtn';

interface SidebarItemProps extends Omit<HtmlHTMLAttributes<HTMLLIElement>, 'onClick'> {
	text: string;
	activeValue?: SELECTED_MENU;
	value: SELECTED_MENU;
	onClick: (data: SELECTED_MENU) => void;
}

export default function Sidebar() {
	const menu = useSelector((state: StoreState) => state.other.selectedMenu);
	const dispatch = useDispatch();
	const toast = useRef<Toast>(null);

	const clickCB = (value: SELECTED_MENU) => {
		dispatch(setSelectedMenu(value));
	};
	
	

	return (
		<aside
			id='default-sidebar'
			className='flex-1 w-56 transition-transform -translate-x-full sm:translate-x-0 border-0 border-r border-gray-200 rounded-lg shadow'
			aria-label='Sidebar'
		>
			<div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 flex flex-col justify-between'>
				<div>
					<p className='font-bold text-xs text-highlight p-3 uppercase'>DashBoard</p>
					<ul className='space-y-2 font-medium'>
						<SidebarItem
							activeValue={menu}
							onClick={clickCB}
							value={SELECTED_MENU.BOOK}
							text='Books'
						/>
						<SidebarItem
							activeValue={menu}
							onClick={clickCB}
							value={SELECTED_MENU.MEMBER}
							text='Members'
						/>
						<SidebarItem
							activeValue={menu}
							onClick={clickCB}
							value={SELECTED_MENU.BORROWED}
							text='Books Borrowed'
						/>
						<SidebarItem
							activeValue={menu}
							onClick={clickCB}
							value={SELECTED_MENU.RETURNED}
							text='Books Returned'
						/>
						<SidebarItem
							activeValue={menu}
							onClick={clickCB}
							value={SELECTED_MENU.TRANSACTION}
							text='Transactions'
						/>
					</ul>
				</div>
				<div role='button' className='text-lg px-5 flex items-center gap-3 w-fit'>
				<LogOutBtn />
				</div>
			</div>
			<Toast ref={toast} />
		</aside>
	);
}

function SidebarItem({ text, activeValue, value, onClick, ...rest }: SidebarItemProps) {
	const active = activeValue === value;
	const circleClassName = classNames({
		'text-primary': active,
		'text-transparent': !active,
		'text-xs': true,
	});
	const dotsClassName = classNames({
		'text-primary': active,
		'text-transparent': !active,
		'text-2xl': true,
	});
	const textClassName = classNames({
		'text-highlight font-semibold': active,
		'text-gray-700': !active,
		'ms-3': true,
	});

	return (
		<li
			onClick={() => onClick(value)}
			className='flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 group active:shadow hover:shadow-primary'
			{...rest}
		>
			<div className='flex items-center'>
				<span className={circleClassName}>
					<BsFillCircleFill />
				</span>
				<span className={textClassName}>{text}</span>
			</div>
			<div className={dotsClassName}>
				<RxDragHandleDots2 />
			</div>
		</li>
	);
}
