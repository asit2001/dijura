
import './global.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ROUTES } from './config/const';
import loadable from '@loadable/component';
import { ProtectedAdmin,ProtectedUser } from '@/views/components/protected-route';
import Loading from '@/views/components/loading';
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
		</PrimeReactProvider>
	);
}

export default App;
