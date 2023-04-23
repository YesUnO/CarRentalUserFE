import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";

const UserPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    return(
        <></>
    );
};

export default UserPage; 