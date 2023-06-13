import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../infrastructure/store";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const PostLoginPage: React.FC = () => {
    useEffect(()=>{
        handleAfterLogin();
    },[])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const externalLoginPending = useSelector((state:RootState)=>  state.authService.loading);

    const handleAfterLogin = async () => {
        
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

export default PostLoginPage; 