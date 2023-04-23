import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { useEffect } from "react";
import { clearOnLeavingPage, createCheckoutSession } from "../stripeReducer";

const AddCardBtn: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);
    const checkoutSessionUrl = useSelector((state: RootState) => state.stripeService.checkoutSessionUrl);

  useEffect(() => {
    if (checkoutSessionUrl != null) {
      window.location.href = checkoutSessionUrl;
    }
  }, [checkoutSessionUrl]);

  useEffect(() => {
    dispatch(clearOnLeavingPage());
  }, []);

  const handleGetCheckoutSession = async () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(createCheckoutSession());
  };

    return(
        <>
          <button disabled={!isAuthenticated} onClick={handleGetCheckoutSession}>Save card</button>
        </>
    );
};

export default AddCardBtn; 