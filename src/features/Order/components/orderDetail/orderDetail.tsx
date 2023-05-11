import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import PayAndCreateOrderBtn from "../payOrderBtn/PayAndCreateOrderBtn";

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
                        <PayAndCreateOrderBtn />
                    </>
                )}
        </>
    );
};

export default OrderDetail; 