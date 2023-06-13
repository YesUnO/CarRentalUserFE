import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../infrastructure/store";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const PostGoogleLoginPage: React.FC = () => {
    useEffect(()=>{
        handleExternalLogingCallback();
    },[])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const externalLoginPending = useSelector((state:RootState)=>  state.authService.loading.externalLogin);

    const handleExternalLogingCallback = async () => {
        if (externalLoginPending) {
            return;
        }
        //TODO: login
        if(true) {
            message.error("Google login failed.");
        }
        else {
            message.success("Succesfully loged in with Google.")
            navigate("/");
        }
    }

    return (
        <>
        </>
    );
};

export default PostGoogleLoginPage; 