import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";

const AdminUserManagmentPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCars());

    return(
        <></>
    );
};

export default AdminUserManagmentPage; 