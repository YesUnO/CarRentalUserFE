import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../infrastructure/store'
import { clearOnLeavingPage, createCheckoutSession } from '../../features/Stripe/stripeReducer'
import { payOrder } from '../../features/Order/orderReducer'
import PickCarPage from '../../features/Car/PickCarPage'

function Trash() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);
  const checkoutSessionUrl = useSelector((state: RootState) => state.stripe.checkoutSessionUrl);

  useEffect(() => {
    if (checkoutSessionUrl != null) {
      window.location.href = checkoutSessionUrl;
    }
  }, [checkoutSessionUrl]);

  useEffect(() => {
    dispatch(clearOnLeavingPage());
  }, []);

  const handleGetCheckoutSession = async () => {
    console.log("yo");
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(createCheckoutSession());
  };

  const handlePayInvoice = async () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(payOrder(2));
  };



  return (
    <div>
      {isAuthenticated ? (
        <>
          <button onClick={handleGetCheckoutSession}>Save card</button>
          <button onClick={handlePayInvoice}>Pay</button>
        </>

      ) : (
        <>
          <button onClick={handleGetCheckoutSession}>Save card</button>
        </>
      )}
      <PickCarPage></PickCarPage>
    </div>
  )
}

export default Trash
