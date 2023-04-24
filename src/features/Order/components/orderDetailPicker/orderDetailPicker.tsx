import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { useEffect, useState } from "react";
import { Order, getOrders } from "../../orderReducer";

const OrderDetailPicker: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getOrders());
  }, []);
  
  const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
  const orderService = useSelector((state: RootState) => state.ordersService);
  const [orderSelect, setOrderSelect] = useState<Order[]>([]);

  const selectCategory = (e:any) => {
    console.log(e);
  };

  return (
    <>
      <select onSelect={(e)=>selectCategory(e)}>
        <option value={0} disabled={orderService.finishedOrders.length == 0}>History</option>
        <option value={1} disabled={orderService.futureOrders.length == 0}>Paid orders</option>
        <option value={2} disabled={orderService.unpaidOrders.length == 0}>Unpaid orders</option>
      </select>
      <select disabled ={orderSelect.length == 0}>
        {orderSelect.map((val,index)=>(
            <option value={index}>{`${val.startDate} - ${val.endDate}`}</option>
        ))}
      </select>
    </>
  );
};

export default OrderDetailPicker;
