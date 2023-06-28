import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";

const AddCardBtn: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);
    const apiUrl = process.env.API_URL;

  const handleGetCheckoutSession = async () => {
    window.location.href = `${apiUrl}/api/stripe`;
  };

    return(
        <>
          <button disabled={!isAuthenticated} onClick={handleGetCheckoutSession}>Save card</button>
        </>
    );
};

export default AddCardBtn; 