import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { payOrder } from "../../features/Order/orderReducer";
import PickCarPage from "../../features/Car/PickCarPage";
import AddCardBtn from "../../features/Stripe/components/addCardBtn";
import OrderDetailPicker from "../../features/Order/components/orderDetailPicker/orderDetailPicker";
import OrderDetail from "../../features/Order/components/orderDetail/orderDetail";

function Trash() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

  const handlePayInvoice = async () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(payOrder(2));
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <button onClick={handlePayInvoice}>Pay</button>
          
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Trash;
