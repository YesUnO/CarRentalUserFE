import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import AddCardBtn from "../Stripe/components/addCardBtn";

const UserPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    return(
        <>
        <AddCardBtn/>
        </>
    );
};

export default UserPage; 