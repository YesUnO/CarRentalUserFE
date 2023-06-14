import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Button } from "antd";
import { sendConfirmMail } from "../../Auth/authReducer";

const ConfirmMail: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.isAuthenticated);
    const emailConfirmed = useSelector((state: RootState) => state.authService.claims.emailVerified);

    const handleResend = () => {

        // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
        dispatch(sendConfirmMail());
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    {emailConfirmed ? (
                        <>
                            <div>Your email is already confirmed.</div>
                        </>
                    ) : (
                        <>
                            <Button type="link" onClick={handleResend}>Resend confirmation email</Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <div>You are not signed in.</div>
                </>
            )}
        </>
    );
};

export default ConfirmMail; 