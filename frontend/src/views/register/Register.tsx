import { SignUpProps } from '@/store/types/AuthState';
import { ErrorMessage, Form, Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/config/const';
import { signUpValidationSchema } from 'src/schema';
import AuthService from '@/services/auth.service';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/views/components/loading';

export default function Register() {
	const navigate = useNavigate();
	const {isLoading,isAdmin,isLoggedIn} = useAuth();
	const path = useLocation().pathname;
	const IS_ADMIN = path.includes('admin');
	const authService = AuthService.getInstance();
	const initialValues: Omit<SignUpProps, 'role'> = {
		phone: '',
		password: '',
		username: '',
		name: '',
		email: '',
	};
    const IS_ADMIN_PATH = path.includes('admin');
    useEffect(()=>{
        if (isAdmin && IS_ADMIN_PATH) {
            navigate(ROUTES.ADMIN)
        }else if (isLoggedIn) {
            navigate(ROUTES.HOME);
        }
    },[IS_ADMIN_PATH, isAdmin, isLoggedIn, navigate])
    if (isLoading) {
        return <Loading/>
    }
	return (
		<div className='flex justify-center items-center relative w-screen h-screen bg-cover after:absolute after:w-full after:h-screen after:bg-black after:opacity-70 after:top-0 after:left-0 bg-[url(https://images.pexels.com/photos/8753672/pexels-photo-8753672.jpeg?auto=compress&cs=tinysrgb&w=1600)]'>
			<div className='flex max-w-[450px] w-full z-10 bg-white md:rounded-md h-screen md:h-[90dvh]'>
				<Formik
					initialValues={initialValues}
					onSubmit={async(values) => {
						try {
							if (path === ROUTES.ADMIN_REGISTER) {
								await authService.adminRegister(values);
								navigate(ROUTES.ADMIN_LOGIN);
							}else{
								await authService.register(values);
								navigate(ROUTES.LOGIN);

							}
						} catch (err) {
							console.log(err);
						}

					}}
					validationSchema={signUpValidationSchema}
				>
					{(props) => (
						<Form className={'p-5 px-6 w-full'}>
							<h2 className='pt-3 pb-2 font-medium'>Welcome to Library</h2>
							<p className='pb-2 text-gray-500'>
								sign up with email address and password
							</p>
							<label className='block text-[15px] pt-3 capitalize' htmlFor='name'>
								Name
							</label>
							<InputText
									className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
									name='name'
									type='text'
									id='name'
									value={props.values.name}
									onChange={props.handleChange}
								/>
							<label className='block text-[15px] pt-3' htmlFor='username'>
								username
							</label>
							<InputText
									className=' py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
									name='username'
									type='text'
									id='username'
									value={props.values.username}
									onChange={props.handleChange}
								/>
							<ErrorMessage name='name' component='div' className='text-TlightRed' />
							<label className='block text-[15px] pt-3 capitalize' htmlFor='phone'>
								Phone No.
							</label>
							<InputText
									className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
									name='phone'
									type='number'
									id='phone'
									value={props.values.phone}
									onChange={props.handleChange}
								/>
							<ErrorMessage name='phone' component='div' className='text-TlightRed' />
							<label className='block text-[15px] pt-3 capitalize' htmlFor='email'>
								email address
							</label>
							<InputText
									className='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
									name='email'
									type='email'
									id='email'
									value={props.values.email}
									onChange={props.handleChange}
								/>
							<ErrorMessage name='email' component='div' className='text-TlightRed' />
							<label className='block text-[15px] pt-3 capitalize' htmlFor='password'>
								password
							</label>
							<Password
									inputClassName='py-2 w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
									className='w-full'
									feedback={false}
									name='password'
									id='password'
									toggleMask
									value={props.values.password}
									onChange={props.handleChange}
								/>
							<ErrorMessage
								name='password'
								component='div'
								className='text-TlightRed'
							/>
							<button
								type='submit'
								className='mt-3 min-w-48 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Sign Up
							</button>
							<p className='py-4 text-base text-black'>
								Already have an account?{' '}
								<Link className='no-underline text-blue-600' to={IS_ADMIN?ROUTES.ADMIN_LOGIN:  ROUTES.LOGIN}>
									Sign In
								</Link>
							</p>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
