import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { StepProps, Steps } from "antd";
import LoginOrRegisterPage from "../Auth/LoginOrRegisterPage";
import { useState } from "react";
import UploadDocumentPhoto from "./components/UploadDocumentPhoto";
import AddCardBtn from "../Stripe/components/addCardBtn";

type StepsItemStatus = "wait" | "process" | "finish" | "error" | undefined;

const UserPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.authService.token != null);

    const user = useSelector((state: RootState) => state.userService.user);
    const [current, setCurrent] = useState(0);

    const onStepChange = (value: number) => {
        setCurrent(value);
    }


    const setStatus =(itemNr: number, condition: boolean ): StepsItemStatus =>{
        if (!condition) {
            return 'finish';    
        }
        else if (itemNr == current) {
            return 'process'
        }
        return 'wait';
    };
    let items: StepProps[] = [
        {
            title: 'Sign in',
            status: setStatus(0, !isAuthenticated),
        },
        {
            title: 'Confirm email',
            status: setStatus(1, (user.email == '' || user.email == null)),
        },
        {
            title: 'Upload Id',
            status: setStatus(2, !user.hasIdCard),
        },
        {
            title: 'Upload driverse license',
            status: setStatus(3, !user.hasDrivingLicense),
        },
        {
            title: 'Save payment card',
            status: setStatus(4, !user.hasActivePaymentCard),
        },
    ];


    return (
        <>
            {(() => {
                switch (current) {
                    case 0:
                        return <LoginOrRegisterPage />
                    case 1:
                        return null;
                    case 2:
                        return <UploadDocumentPhoto />
                    case 3:
                        return <UploadDocumentPhoto />
                    case 4:
                        return <AddCardBtn />

                    default:
                        return null;
                }
            })()}
            <Steps current={current} items={items} onChange={onStepChange}/>
        </>
    );
};

export default UserPage; 