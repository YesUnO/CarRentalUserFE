import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import "./CarThumb.css"
import { useState } from "react";
import { Car } from "../../carReducer";
import { RootState } from "../../../../infrastructure/store";

export type CarComponentProps = {
    props: Car,
}

const CarThumb: React.FC<CarComponentProps> = ({ props: car }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    const [custom, setCustom] = useState(true);
    const conditionalStyles = classNames({
        "highlighted": car.isPicked
    });

    

    return (
        <>
            <div className={conditionalStyles}>{car.name}</div>
        </>
    );
};

export default CarThumb;