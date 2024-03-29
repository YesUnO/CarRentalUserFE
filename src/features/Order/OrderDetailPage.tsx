import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import OrderDetailPicker from "./components/orderDetailPicker/orderDetailPicker";
import OrderDetail from "./components/orderDetail/orderDetail";

const OrderDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);

    return (
        <>
            <h3>Order detail</h3>

            <OrderDetailPicker />
            <OrderDetail />
        </>
    );
};

export default OrderDetailPage; 