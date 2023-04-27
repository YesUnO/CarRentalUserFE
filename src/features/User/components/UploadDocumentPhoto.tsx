import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import UploadPhoto, { UploadComponentProps } from "../../File/components/uploadPhoto";

const UploadDocumentPhoto: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

const componentProps:UploadComponentProps = {
  endpoint: ""
};

  return (
    <>
      <UploadPhoto componentProps={componentProps} />
    </>
  );
};

export default UploadDocumentPhoto;
