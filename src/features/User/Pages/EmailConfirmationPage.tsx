import { useDispatch } from "react-redux";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const EmailConfirmationPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = () => {
        navigate("/user");
    };

    return(
        <>
        <div>Thank you for confirming your email. <Button type="link" onClick={handleLogin}>Sign in</Button> </div>
        </>
    );
};

export default EmailConfirmationPage;