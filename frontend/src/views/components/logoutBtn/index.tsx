import { ROUTES } from "@/config/const";
import AuthService from "@/service/auth.service";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { RxExit } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogOutBtn() {
	const navigate = useNavigate();
	const toast = useRef<Toast>(null);
    const path = useLocation().pathname;
    const IS_ADMIN_PATH = path.includes('admin');
	const logout = async()=>{
		try {
			await AuthService.getInstance().logout();
            if (IS_ADMIN_PATH) {
                navigate(ROUTES.ADMIN_LOGIN);
            }else{
                navigate(ROUTES.LOGIN);
            }
		} catch (error) {
				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: error as string,
					life: 3000,
				});
		}
	}
	return (
		<div onClick={logout} role='button' className='text-lg flex items-center gap-2'>
			<RxExit />
			<p>Sign Out</p>
			<Toast ref={toast} />
		</div>
	);
}
