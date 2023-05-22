import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../infrastructure/store";
import { externalLoginCallbackAndParseToken } from "../authReducer";
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
        const res = await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(externalLoginCallbackAndParseToken());
        if(res.error) {
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