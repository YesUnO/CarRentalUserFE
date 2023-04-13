import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Trash.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../infrastructure/store'
import { createCheckoutSession } from '../../features/Stripe/stripeReducer'

function Trash() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();

  const handleGetSession = async () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    await dispatch(createCheckoutSession());
  };

  const isAuthenticated = useSelector((state: RootState) => state.auth.token != null);

  return (
    <div className="App">

     
          <button onClick={handleGetSession}>Save card</button>
       


    </div>
  )
}

export default Trash
