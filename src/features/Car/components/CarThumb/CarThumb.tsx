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
    (state: RootState) => state.authService.isAuthenticated
  );

  const newOrder = useSelector(
    (state: RootState) => state.ordersService.newOrder
  );

  const isAvailable =
  // false; 
  !isInDateRange(newOrder.startDate, newOrder.endDate, car.unavailable);

  const conditionalStyles = classNames({
    disabled: !isAvailable,
  });


  const getActions = () => {
    if (isAvailable) {
      return (
        [<PayAndCreateOrderBtn />]
      )
    }
    return ([
      <div>Car is not available in this timeframe</div>
    ])
  }

  return (
    <>
        <Card 
        className={conditionalStyles} 
        cover={<img src={car.pictureUrl}/>}
        actions={getActions()}
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
