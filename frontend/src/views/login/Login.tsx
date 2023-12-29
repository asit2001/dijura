import { useAuth } from '@/hooks/useAuth';
import AuthService from '@/services/auth.service';
import { LoginProps } from '@/store/types/AuthState';
import { User } from '@/store/types/userState';
import { ErrorMessage, Form, Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, USER_TYPES } from 'src/config/const';
import { loginValidationSchema } from 'src/schema';
import Loading from '@/views/components/loading';
import { Toast } from 'primereact/toast';

export default function Login() {
	const navigate = useNavigate();
    const {isLoading,isAdmin,isLoggedIn} = useAuth();
	const toast = useRef<Toast>(null);

	const authService = AuthService.getInstance();
	const initialValues: LoginProps = {
		email: '',
		password: '',
	};
	const path = useLocation().pathname;
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
		<div className='flex justify-center items-center relative w-screen h-screen bg-cover after:absolute after:w-full after:h-screen after:bg-black after:opacity-70 after:top-0 after:left-0 bg-[url(https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg)]'>
			<div className='flex max-w-[450px] w-full z-10 bg-white h-screen md:h-[90dvh]'>
				<Formik
					initialValues={initialValues}
					onSubmit={async (val) => {
						try {
							let user: User;
							if (path === ROUTES.ADMIN_LOGIN) {
								user = await authService.adminLogin(val);
							} else {
								user = await authService.login(val);
							}
							navigate(user.role === USER_TYPES.ADMIN ? ROUTES.ADMIN : ROUTES.HOME);
						} catch (error) {
								toast.current?.show({
									severity: 'error',
									summary: 'Error',
									detail: error as string,
									life: 3000,
								});
							
						}
					}}
					validationSchema={loginValidationSchema}
				>
					{(props) => (
						<Form className={'p-7 w-full'}>
							<h2 className='pt-7 pb-2 text-xl font-bold'>Welcome Back</h2>
							<p className='pb-5 text-Tgray'>
								sign in with your email address and password
							</p>

							<label className='block text-[15px] pt-5 capitalize' htmlFor='email'>
								email address
							</label>
							<div className='pb-2'>
								<InputText
									className='w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
									name='email'
									type='email'
									id='email'
									value={props.values.email}
									onChange={props.handleChange}
								/>
							</div>
							<ErrorMessage name='email' component='div' className='text-TlightRed' />
							<label className='block text-[15px] pt-5 capitalize' htmlFor='password'>
								password
							</label>
							<div className='pb-2'>
								<Password
									inputClassName='w-full border-x-0 border-t-0 shadow-none border-b rounded-none'
									className='w-full'
									feedback={false}
									name='password'
									id='password'
									toggleMask
									value={props.values.password}
									onChange={props.handleChange}
								/>
							</div>
							<ErrorMessage
								name='password'
								component='div'
								className='text-TlightRed'
							/>
							
							<button
								type='submit'
								className='mt-3 min-w-48 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Sign In
							</button>
							<p className='py-4 text-base text-black'>
								Don't have an account?{' '}
								<Link className='text-Tblue' to={IS_ADMIN_PATH?ROUTES.ADMIN_REGISTER:  ROUTES.REGISTER}>
									Sign Up
								</Link>
							</p>
							{IS_ADMIN_PATH &&
								<p className='py-4 text-base text-black'>
								<Link className='text-Tblue' to={ROUTES.HOME}>
									Back to home
								</Link>
							</p>
							}
						</Form>
					)}
				</Formik>
			</div>
			<Toast ref={toast} />
		</div>
	);
}
