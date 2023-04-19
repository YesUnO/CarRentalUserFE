import { useEffect, useState } from 'react'
import './Trash.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../infrastructure/store'
import { clearOnLeavingPage, createCheckoutSession } from '../../features/Stripe/stripeReducer'
import { payOrder } from '../../features/Order/orderReducer'

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
        <></>
      )}
    </div>
  )
}

export default Trash
