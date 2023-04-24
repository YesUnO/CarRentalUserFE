import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";

const OrderDetail: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
    const orderDetail = useSelector((state: RootState) => state.ordersService.orderDetail);

    const log = () => {
        console.log(orderDetail);
    };

    return(
        <>
        <h2>Order detail</h2>
        <button onClick={log}>huh?</button>
        </>
    );
};

export default OrderDetail; 