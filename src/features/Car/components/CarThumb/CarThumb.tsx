import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import "./CarThumb.css";
import { useState } from "react";
import { Car } from "../../carReducer";
import { RootState } from "../../../../infrastructure/store";
import Title from "antd/es/typography/Title";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";

export type CarComponentProps = {
  props: Car;
};

const CarThumb: React.FC<CarComponentProps> = ({ props: car }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

  const [custom, setCustom] = useState(true);
  const conditionalStyles = classNames({
    highlighted: car.isPicked,
  });

  return (
    <>
        <Card className={conditionalStyles} style={{ width: 300 }} cover={<img src={car.pictureUrl}></img>}>
          <Meta
            title={car.name}
            description={"yo yo yo yo yo yo yo yo yo yo yo"}
          />
        </Card>
        {/* <Title>{car.name}</Title>
        <Image preview={false} src={car.pictureUrl} width={200}></Image> */}
    </>
  );
};

export default CarThumb;
