import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { useState } from "react";
import { Order } from "../../orderReducer";

const OrderDetailPicker: React.FC = () => {
  const dispatch = useDispatch();
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
