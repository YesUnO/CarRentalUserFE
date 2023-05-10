import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../infrastructure/store";

const newComp: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    const yo = false;

    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCars());

    return (
        <>
            {yo ? (
                <>
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
};

export default newComp; 