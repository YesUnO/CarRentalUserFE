import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { payOrder } from "../../orderReducer";

const PayOrderBtn: React.FC = () => {
    const dispatch = useDispatch();
    const orderDetail = useSelector((state: RootState) => state.ordersService.orderDetail);

    const handlePayInvoice = async () => {
        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        await dispatch(payOrder(orderDetail?.id));
      };
    return(
        <>
          <button onClick={handlePayInvoice}>Pay</button>
        </>
    );
};

export default PayOrderBtn; 