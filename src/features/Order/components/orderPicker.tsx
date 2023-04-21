import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Order, setNewOrder } from "../orderReducer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";


const OrderPicker: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);
    const newOrder = useSelector((state: RootState) => state.order.newOrder);

    const getExcludeDaysInterval = (): { start: Date; end: Date; }[] => {
        if (true) {
            return []
        }

        return [
            {
                start: subDays(new Date(), 5),
                end: addDays(new Date(), 5)
            }
        ]
    };

    const handleDateChanges = (dateRange: [Date | null, Date | null]) => {
        const [startDate, endDate] = dateRange;
        const order: Order = { ...newOrder, startDate: startDate, endDate: endDate };

        dispatch(setNewOrder(order));
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
            <button>Make order</button>
        </>
    );
};

export default OrderPicker;