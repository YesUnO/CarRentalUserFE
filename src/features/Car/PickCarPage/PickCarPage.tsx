import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { useEffect } from "react";
import { getCars, pickCar } from "../carReducer";
import OrderPicker from "../../Order/components/orderPicker";
import CarThumb from "../components/CarThumb/CarThumb";
import "./pickCarPage.css"
import { api } from "../../../infrastructure/utils/System";

const PickCarPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
    const cars = useSelector((state: RootState) => state.carsService.cars);

    useEffect(() => {
        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        dispatch(getCars());
    }, []);

    const handleCarSelect = (index: number) => {
        dispatch(pickCar(index));
    };

    const handleTest = async () => {
        console.log("yo");
        const yo = await api.get("/api/order/test");
    }

    return (
        <>
            <h3>Cars</h3>
            <button onClick={handleTest}>Test</button>
            <OrderPicker />
            <div className="grid-container">
                {cars.map((item, index) => (
                    <div key={index} onClick={() => handleCarSelect(index)}>
                        <CarThumb props={item} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default PickCarPage; 