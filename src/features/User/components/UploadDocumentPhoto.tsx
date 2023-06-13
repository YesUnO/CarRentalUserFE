import { useDispatch } from "react-redux";
import UploadPhoto, {
  UploadComponentProps,
} from "../../File/components/uploadPhoto";
import { getCustomer } from "../userReducer";

type UploadDocumentPropsWrapper = {
  props: UploadDocumentProps;
};

export type UploadDocumentProps = {
  uploadComponentProps: UploadPageProps;
};

export type UploadPageProps = {
  hasFrontPhoto: boolean;
  hasBackPhoto: boolean;
  baseRequestParam: string;
};

const UploadDocumentPhoto: React.FC<UploadDocumentPropsWrapper> = ({
  props,
}) => {
  const dispatch = useDispatch();
  const handleGetUser = () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCustomer());
  };
  const uploadComponentProps = props.uploadComponentProps;
  const uploadPropsBack: UploadComponentProps = {
    endpoint: "api/file",
    additionalRequestParam: {
      UserDocumentImageType:
        uploadComponentProps.baseRequestParam + "BackImage",
    },
    queryId: "",
    fileIsUploaded: uploadComponentProps.hasBackPhoto,
    callback: () => handleGetUser(),
  };

  const uploadPropsFront: UploadComponentProps = {
    endpoint: "api/file",
    additionalRequestParam: {
      UserDocumentImageType:
        uploadComponentProps.baseRequestParam + "FrontImage",
    },
    queryId: "",
    fileIsUploaded: uploadComponentProps.hasFrontPhoto,
    callback: () => handleGetUser(),
  };

  return (
    <>
      {uploadPropsFront.fileIsUploaded ? (
        <>
          <div>User already has this file uploaded</div>
        </>
      ) : (
        <>
          <UploadPhoto componentProps={uploadPropsFront} />
        </>
      )}
      {uploadPropsBack.fileIsUploaded ? (
        <>
          <div>User already has this file uploaded</div>
        </>
      ) : (
        <>
          <UploadPhoto componentProps={uploadPropsBack} />
        </>
      )}
    </>
  );
};

export default UploadDocumentPhoto;
