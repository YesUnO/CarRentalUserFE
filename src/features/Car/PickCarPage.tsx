import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { useEffect } from "react";
import { getCars } from "./carReducer";
import CarThumb from "./components/CarThumb";

const PickCarPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);
    const cars = useSelector((state: RootState) => state.car.cars);

    useEffect(() => {
        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        dispatch(getCars());
    }, [dispatch]);

    return (
        <>
            <h3>Cars</h3>
            {cars.map((item, index) => (
                <CarThumb key={index} props={item} />
            ))}
        </>
    );
};

export default PickCarPage; 