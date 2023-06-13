import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../infrastructure/store";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getUserClaims } from "../authReducer";

const PostLoginPage: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.isAuthenticated
  );
  useEffect(() => {
    handlelLogingCallback();
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      message.error("Google login failed.");
    } else {
      message.success("Succesfully loged in with Google.");
      // navigate("/");
    }
  }, [isAuthenticated]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const claims = useSelector((state: RootState) => state.authService.claims);

  const handlelLogingCallback = async () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getUserClaims());
  };

  return (
    <>
      <div>{claims.email}</div>
      <div>{claims.role}</div>
      <div>{claims.name}</div>
    </>
  );
};

export default PostLoginPage;
