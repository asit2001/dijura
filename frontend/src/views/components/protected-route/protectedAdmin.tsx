import { Navigate } from "react-router-dom";
import {useAuth} from "@/hooks/useAuth";
import { ROUTES } from "@/config/const";
import Loading from '@/views/components/loading';


type Props = {
    children: React.ReactNode;
};

export default function ProtectedAdmin({ children }: Props) {
    const {isLoggedIn, isLoading,isAdmin} = useAuth();

    if (isLoading) {
        return <Loading/>;
    }
    if (!isLoggedIn) return <Navigate to={ROUTES.ADMIN_LOGIN} />;
    if (!isAdmin) return <Navigate to={ROUTES.HOME} />;
    return <>{children}</>;
}


