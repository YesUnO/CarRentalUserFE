import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Order, createOrder, setNewOrder } from "../orderReducer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import { CreateOrderRequest } from "../orderReducer";

const OrderPicker: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.token != null
  );
  const newOrder = useSelector((state: RootState) => state.order.newOrder);

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

  const handleDateChanges = (dateRange: [Date | null, Date | null]) => {
    const [startDate, endDate] = dateRange;
    const order: Order = {
      ...newOrder,
      startDate: startDate,
      endDate: endDate,
    };

    dispatch(setNewOrder(order));
  };


  const handleCreateOrder = () => {
    const request: CreateOrderRequest = {
      carId: newOrder.car?.id as number,
      startDate: newOrder.startDate as Date,
      endDate: newOrder.endDate as Date,
    };
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(createOrder(request));
  };


  const isOrderReady = (): boolean => {
    return (
      newOrder.startDate != null &&
      newOrder.endDate != null &&
      newOrder.car != null
    );
  };

  const isCreateOrderBtnDisabled = (): boolean => {
    return !isAuthenticated && !isOrderReady();
  };


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
      <button
        disabled={isCreateOrderBtnDisabled()}
        onClick={() => handleCreateOrder()}
      >
        Make order
      </button>
    </>
  );
};

export default OrderPicker;
