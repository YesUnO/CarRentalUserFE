import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { CreateOrderRequest } from "../../orderReducer";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const PayAndCreateOrderBtn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newOrder = useSelector((state: RootState) => state.ordersService.newOrder);
  const user = useSelector((state: RootState) => state.userService.user);
  const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);

  const missingRegistrationSteps = !user.hasActivePaymentCard
    || !user.hasDrivingLicense
    || !user.hasIdCard
    || user.email == null
    || user.email == "";

  const hasnBeenVerifiedYet = !user.hasIdCardVerified || !user.hasDrivingLicenseVerified || !user.isApprooved;

  const handleCreateOrder = () => {
    if (!isAuthenticated) {
      message.warning("Login or create a new account to make an order.");
      navigate("/user");
      return;
    }
    else if (missingRegistrationSteps) {
      navigate("/user");
      return;
    }
    else if (hasnBeenVerifiedYet) {
      message.warning("Your account hasnt been approoved yet. We are working on it, give us some time.");
    }
    else {
      const request: CreateOrderRequest = {
        carId: newOrder.carId as number,
        startDate: newOrder.startDate as Date,
        endDate: newOrder.endDate as Date,
      };
      // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
      dispatch(createOrder(request));
    }
  };

  return (
    <>
      <Button onClick={handleCreateOrder}>Make an order</Button>
    </>
  );
};

export default PayAndCreateOrderBtn;