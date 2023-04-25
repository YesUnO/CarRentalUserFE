import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";

const ConfirmMail: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    return (
        <>
            <div>Confirm mail</div>
        </>
    );
};

export default ConfirmMail; 