import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import UploadPhoto, {
  UploadComponentProps,
} from "../../File/components/uploadPhoto";
import { mapValues, values } from "lodash";

type UploadDocumentPropsWrapper = {
  props: UploadDocumentProps;
};

export type UploadDocumentProps = {
  uploadComponentProps: UploadComponentProps;
};

const UploadDocumentPhoto: React.FC<UploadDocumentPropsWrapper> = ({
  props,
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

  const uploadPropsBack: UploadComponentProps = {
    ...props.uploadComponentProps,
    additionalRequestParam: mapValues(
      props.uploadComponentProps.additionalRequestParam,
      (value) => {
        return value + "BackImage";
      }
    ),
  };

  const uploadPropsFront: UploadComponentProps = {
    ...props.uploadComponentProps,
    additionalRequestParam: mapValues(
      props.uploadComponentProps.additionalRequestParam,
      (value) => {
        return value + "FrontImage";
      }
    ),
  };

  return (
    <>
      <UploadPhoto componentProps={uploadPropsFront} />
      <UploadPhoto componentProps={uploadPropsBack} />
    </>
  );
};

export default UploadDocumentPhoto;
