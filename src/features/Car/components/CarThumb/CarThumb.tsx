import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import "./CarThumb.css";
import { Car } from "../../carReducer";
import { RootState } from "../../../../infrastructure/store";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { isDateInRange as isInDateRange } from "../../../../infrastructure/utils/date/dateHelper";
import PayAndCreateOrderBtn from "../../../Order/components/payOrderBtn/PayAndCreateOrderBtn";

export type CarComponentProps = {
  props: Car;
};

const CarThumb: React.FC<CarComponentProps> = ({ props: car }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

  const newOrder = useSelector(
    (state: RootState) => state.ordersService.newOrder
  );

  const conditionalStyles = classNames({
    highlighted: car.isPicked,
  });

  const isAvailable = !isInDateRange(newOrder.startDate, newOrder.endDate, car.unavailable);

  return (
    <>
        <Card 
        className={conditionalStyles} 
        style={{ width: 300 }} 
        cover={<img src={car.pictureUrl}/>}
        actions={[<PayAndCreateOrderBtn />]}
        >
          <Meta
            title={car.name}
            description={"to be con continued..."}
          />
        </Card>
    </>
  );
};

export default CarThumb;
