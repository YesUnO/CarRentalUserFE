import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import PayOrderBtn from "../payOrderBtn/PayOrderBtn";

const OrderDetail: React.FC = () => {
    const dispatch = useDispatch();
    const orderDetail = useSelector((state: RootState) => state.ordersService.orderDetail);

    const log = () => {
        console.log(orderDetail);
    };

    return (
        <>
            <h2>Order detail</h2>
            {orderDetail?.paid?
                (
                    <>
                    </>
                )
                :
                (
                    <>
                        <PayOrderBtn />
                    </>
                )}
        </>
    );
};

export default OrderDetail; 