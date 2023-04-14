import { useEffect, useState } from 'react'
import './Trash.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../infrastructure/store'
import { clearOnLeavingPage, createCheckoutSession } from '../../features/Stripe/stripeReducer'

function Trash() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);
  const checkoutSessionUrl = useSelector((state: RootState) => state.stripe.checkoutSessionUrl);

  useEffect(() => {
    if (checkoutSessionUrl != null) {
      window.location.href = checkoutSessionUrl;
    }
  }, [checkoutSessionUrl]);

  useEffect(()=>{
    dispatch(clearOnLeavingPage());    
  },[]);  

  const handleGetSession = async () => {
    console.log(checkoutSessionUrl);
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(createCheckoutSession());
  };


  return (
    <div className="App">
      <button onClick={handleGetSession}>Save card</button>
    </div>
  )
}

export default Trash
