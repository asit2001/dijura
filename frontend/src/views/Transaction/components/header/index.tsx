import { GoSearch } from 'react-icons/go';
import logo from 'src/assets/logo.png';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/const';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'primereact/hooks';
import { useEffect } from 'react';
import LogOutBtn from '@/components/logoutBtn';
import { useProfile } from '@/hooks/useUsers';
import { StoreState } from '@/store/store';
import { setFilteredTransactions } from '@/store/reducers/TransactionReducer';

export default function Header() {
	const [inputValue, debouncedValue, setInputValue] = useDebounce('', 400);
    useProfile();

	const {name} = useSelector((state:StoreState)=>state.user.profile)
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setFilteredTransactions(debouncedValue));
	}, [debouncedValue, dispatch]);

	return (
		<div className='flex pt-2 px-3  md:px-8 md:gap-5 justify-between md:justify-normal items-center'>
			<Link to={ROUTES.HOME}><img src={logo} alt='logo' className='w-20 h-20 ' /></Link>

			<div className='p-input-icon-left w-full hidden md:block'>
				<GoSearch />
				<InputText
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					placeholder='Search'
					className='w-full border-none focus:shadow-none bg-gray-100'
				/>
			</div>
			<div className='flex items-center gap-4'>
				<Link to={ROUTES.HOME} className='font-medium text-lg'>
					Home
				</Link>
				<Dropdown
					label=''
					renderTrigger={() => (
						<div className='flex items-center justify-center cursor-pointer w-8 h-8 text-white text-center rounded-full bg-purple-800'>
							{name.charAt(0).toUpperCase()}
						</div>
					)}
				>
					<Dropdown.Item className='bg-white'>
						<LogOutBtn />
					</Dropdown.Item>
				</Dropdown>
			</div>
		</div>
	);
}

