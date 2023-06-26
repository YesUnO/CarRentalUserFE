import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const EmailConfirmationPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const msg = searchParams.get("result");
    const [message, setMessage] = useState("Thank you for confirming your email.")

    useEffect(()=>{
        if (msg == "False") {
            setMessage("Wrong");
        }
        if (msg == "Resended") {
            console.log("yo");
        }
    },[msg])
    
    const handleLogin = () => {
        window.location.href = "/bff/login?returnUrl=/";
    };

    return(
        <>
        <div>{message} <Button type="link" onClick={handleLogin}>Sign in</Button> </div>
        </>
    );
};

export default EmailConfirmationPage;