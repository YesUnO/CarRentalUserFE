import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Order, createOrder, setNewOrder,  } from "../orderReducer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import { CreateOrderRequest } from "../orderReducer";
import { clearPickedCar } from "../../Car/carReducer";

const OrderPicker: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );
  const newOrder = useSelector((state: RootState) => state.ordersService.newOrder);

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

  const handleClearPickedCar = () => {
    dispatch(clearPickedCar());
    dispatch(setNewOrder({...newOrder, car:null}));
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
      newOrder.car != null;

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
      <div>
        <button disabled={isCreateOrderBtnDisabled} onClick={() => handleCreateOrder()}>Make order</button>
        {/* <button onClick={()=>handleClearPickedCar()}>Clear picked car</button>
        <button onClick={()=>dispatch(setNewOrder({ ...newOrder, startDate: null, endDate: null }))}>Clear dates</button>
        <button onClick={()=>console.log(newOrder)}>Check state</button> */}
      </div>
    </>
  );
};

export default OrderPicker;
