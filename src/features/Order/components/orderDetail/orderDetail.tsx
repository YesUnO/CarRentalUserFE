import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import PayOrderBtn from "../payOrderBtn/PayOrderBtn";

const OrderDetail: React.FC = () => {
    const dispatch = useDispatch();
    const orderDetail = useSelector((state: RootState) => state.ordersService.orderDetail);

    return (
        <>
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