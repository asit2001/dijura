import { Navigate } from "react-router-dom";
import {useAuth} from "@/hooks/useAuth";
import { ROUTES } from "@/config/const";
import Loading from '@Loading';


type Props = {
    children: React.ReactNode;
};

export default function ProtectedUser({ children }: Props) {
    const {isLoggedIn, isLoading} = useAuth();

    if (isLoading) {
        return <Loading/>;
    }
    if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} />;

    return <>{children}</>;
}


