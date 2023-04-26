import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import UploadPhoto from "../../File/components/uploadPhoto";

const UploadDocumentPhoto: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

  return (
    <>
      <UploadPhoto />
    </>
  );
};

export default UploadDocumentPhoto;
