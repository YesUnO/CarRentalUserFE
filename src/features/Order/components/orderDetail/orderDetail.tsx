import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";

const newComp: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
    const orderDetail = useSelector((state: RootState) => state.ordersService.orderDetail);

    return(
        <></>
    );
};

export default newComp; 