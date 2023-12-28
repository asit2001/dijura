import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import PrimeReact from './PrimeReact';
import { ROUTES } from './config/const';
import loadable from '@loadable/component';
import { ProtectedAdmin,ProtectedUser } from '@protectedRoute';
import Loading from '@Loading';
import HomePage from '@/views/home';
import { PrimeReactProvider } from 'primereact/api';

const AdminPage = loadable(() => import('@/views/admin/Admin'), {
	fallback: <Loading/>,
});
const LoginPage = loadable(() => import('@/views/login/Login'), {
	fallback: <Loading/>,
});
const RegisterPage = loadable(() => import('@/views/register/Register'), {
	fallback: <Loading/>,
});
const TransactionPage = loadable(()=>import('@/views/Transaction/TransactionPage'),{
	fallback:<Loading/>
});
function App() {
	return (
		<PrimeReactProvider value={{ripple:true}}>
			<PrimeReact>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path={ROUTES.HOME} element={
							<ProtectedUser>
								<HomePage/>
							</ProtectedUser>
						} />
						<Route path={ROUTES.TRANSACTION} element={
							<ProtectedUser>
								<TransactionPage/>
							</ProtectedUser>
						} />
						<Route
							path={ROUTES.ADMIN}
							element={
								<ProtectedAdmin>
									<AdminPage />
								</ProtectedAdmin>
							}
						/>
						<Route path={ROUTES.LOGIN} element={<LoginPage />} />
						<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
						<Route path={ROUTES.ADMIN_LOGIN} element={<LoginPage />} />
						<Route path={ROUTES.ADMIN_REGISTER} element={<RegisterPage />} />
					</Routes>
				</BrowserRouter>
			</Provider>
			</PrimeReact>
		</PrimeReactProvider>
	);
}

export default App;
