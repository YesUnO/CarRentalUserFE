import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { NewOrder, createOrder, setNewOrder, } from "../orderReducer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import { CreateOrderRequest } from "../orderReducer";
import { useNavigate } from "react-router-dom";

const OrderPicker: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
  const newOrder = useSelector((state: RootState) => state.ordersService.newOrder);
  const user = useSelector((state: RootState) => state.userService.user);

  const missingRegistrationSteps = !user.hasActivePaymentCard
    || !user.hasDrivingLicense
    || !user.hasIdCard
    || user.email == null
    || user.email == "";

  const hasnBeenVerifiedYet = !user.HasIdCardVerified || !user.hasDrivingLicenseVerified || !user.isApprooved;

  const handleDateChanges = (dateRange: [Date | null, Date | null]) => {
    const [startDate, endDate] = dateRange;
    const order: NewOrder = {
      ...newOrder,
      startDate: startDate,
      endDate: endDate,
    };

    dispatch(setNewOrder(order));
  };

  const handleCreateOrder = () => {
    if (!isAuthenticated) {
      return;

    }
    else if (missingRegistrationSteps) {
      navigate("/user");
      return;
    }
    else if (hasnBeenVerifiedYet) {
      
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

  const getExcludeDaysInterval = (): { start: Date; end: Date }[] => {
    if (true) {
      return [];
    }

    return [
      {
        start: subDays(new Date(), 5),
        end: addDays(new Date(), 5),
      },
    ];
  };

  let isOrderReady =
    newOrder.startDate != null &&
    newOrder.endDate != null &&
    newOrder.carId != null;

  let isCreateOrderBtnDisabled =
    !isAuthenticated || !isOrderReady;


  return (
    <>
      <DatePicker
        selected={newOrder.startDate}
        startDate={newOrder.startDate}
        endDate={newOrder.endDate}
        minDate={new Date()}
        excludeDateIntervals={getExcludeDaysInterval()}
        onChange={(dateRange) => handleDateChanges(dateRange)}
        selectsRange
        // selectsDisabledDaysInRange
        inline
      />
    </>
  );
};

export default OrderPicker;
