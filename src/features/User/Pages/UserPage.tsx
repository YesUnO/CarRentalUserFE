import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { StepProps, Steps } from "antd";
import RegisterPage from "../../Auth/pages/RegisterPage";
import { useState } from "react";
import UploadDocumentPhoto, {
  UploadDocumentProps,
} from "../components/UploadDocumentPhoto";
import AddCardBtn from "../../Stripe/components/addCardBtn";
import ConfirmMail from "../components/confirmEmail";

type StepsItemStatus = "wait" | "process" | "finish" | "error" | undefined;

const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

  const user = useSelector((state: RootState) => state.userService.user);
  const [current, setCurrent] = useState(0);

  const onStepChange = (value: number) => {
    setCurrent(value);
  };

  const setStatus = (itemNr: number, condition: boolean): StepsItemStatus => {
    if (!condition) {
      return "finish";
    } else if (itemNr == current) {
      return "process";
    }
    return "wait";
  };

  let items: StepProps[] = [
    {
      title: "Sign in",
      status: setStatus(0, !isAuthenticated),
    },
    {
      title: "Confirm email",
      status: setStatus(1, !user.hasEmailVerified),
    },
    {
      title: "Upload Id",
      status: setStatus(2, !user.hasIdCard),
    },
    {
      title: "Upload driverse license",
      status: setStatus(3, !user.hasDrivingLicense),
    },
    {
      title: "Save payment card",
      status: setStatus(4, !user.hasActivePaymentCard),
    },
  ];

  const uploadDriverseLicenseProps: UploadDocumentProps = {
    uploadComponentProps: {
      hasFrontPhoto: user.hasDrivingLicenseFrontImg,
      baseRequestParam: "DriverseLicense" ,
      hasBackPhoto: user.hasDrivingLicenseBackImg,
    },
  };

  const uploadIdProps: UploadDocumentProps = {
    uploadComponentProps: {
      hasFrontPhoto: user.hasIdFrontImg,
      baseRequestParam: "IdentificationCard" ,
      hasBackPhoto: user.hasIdBackImg
    },
  };

  return (
    <>
      <h3>Profile</h3>
      {(() => {
        switch (current) {
          case 0:
            return <RegisterPage />;
          case 1:
            return <ConfirmMail />;
          case 2:
            return <UploadDocumentPhoto props={uploadIdProps} />;
          case 3:
            return <UploadDocumentPhoto props={uploadDriverseLicenseProps} />;
          case 4:
            return <AddCardBtn />;

          default:
            return null;
        }
      })()}
      <Steps current={current} items={items} onChange={onStepChange} />
    </>
  );
};

export default UserPage;
