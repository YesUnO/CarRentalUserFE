import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { useEffect, useState } from "react";
import { Order, getOrders, setOrderDetail } from "../../orderReducer";
import { format, parseISO } from "date-fns";

const OrderDetailPicker: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getOrders());
  }, []);

  const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);
  const [selectedOrderCategory, setSelectedOrderCategory] = useState('');
  const orderService = useSelector((state: RootState) => state.ordersService);
  const [orderSelect, setOrderSelect] = useState<Order[]>([]);

  const selectCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedOrderCategory(event.currentTarget.value);
    switch (event.currentTarget.value) {
      case "-1":
        setOrderSelect([]);
        break;
      case "0":
        setOrderSelect(orderService.finishedOrders);
        break;
      case "1":
        setOrderSelect(orderService.futureOrders);
        break;
      case "2":
        setOrderSelect(orderService.unpaidOrders);
        break;
      default:
        console.log("something went wrong in the order detail picker")
        break;
    }
  };

  const selectOrder = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value == "-1") {
      return;
    }

    let selectedOrder: Order = {
      id: undefined,
      startDate: null,
      endDate: null,
      created: null,
      car: null,
      paid: false,
      price: null
    };
    switch (selectedOrderCategory) {
      case "0":
        selectedOrder = orderService.finishedOrders[(event.currentTarget.value as unknown as number)]
        break;
      case "1":
        selectedOrder = orderService.futureOrders[(event.currentTarget.value as unknown as number)]
        break;
      case "2":
        selectedOrder = orderService.unpaidOrders[(event.currentTarget.value as unknown as number)]
        break;
      default:
        console.log("something went wrong in the order detail picker")
        break;
    }
    dispatch(setOrderDetail(selectedOrder));
  };

  const formatDate =(date: Date | null)=> {
    return format(parseISO(date as unknown as string), "d.L.y")
  };

  const getOrderDateRange=(order:Order) => {
    return `${formatDate(order.startDate)} - ${formatDate(order.endDate)}`;
  }

  return (
    <>
      <select onChange={selectCategory} value={selectedOrderCategory}>
        <option key="order_category_default" value="-1">--select Order category</option>
        <option value={0} key="order_category_0" disabled={orderService.finishedOrders.length == 0}>{`History (${orderService.finishedOrders.length})`}</option>
        <option value={1} key="order_category_1" disabled={orderService.futureOrders.length == 0}>{`Paid orders (${orderService.futureOrders.length})`}</option>
        <option value={2} key="order_category_2" disabled={orderService.unpaidOrders.length == 0}>{`Unpaid orders (${orderService.unpaidOrders.length})`}</option>
      </select>
      <select disabled={orderSelect.length == 0} onChange={selectOrder}>
      <option key="order_default" value="-1">--select Order</option>
        {orderSelect.map((val, index) => (
          <option key={`order_${index}`} value={index}>{getOrderDateRange(val)}</option>
        ))}
      </select>
    </>
  );
};

export default OrderDetailPicker;
