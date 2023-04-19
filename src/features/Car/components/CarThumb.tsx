import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Car } from "../carReducer";

export type CarComponentProps = {
    props: Car
}

const CarThumb: React.FC<CarComponentProps> = ({props}) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);

    return(
        <>
            <div>{props.name}</div>
        </>
    );
};

export default CarThumb; 