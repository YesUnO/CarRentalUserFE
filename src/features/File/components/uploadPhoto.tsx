import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Button, Upload, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export type UploadComponentPropsWrapper = {
  componentProps: UploadComponentProps;
};

export type UploadComponentProps = {
  endpoint: string;
  queryId: number | string;
  additionalRequestParam?: Record<string,string>
  fileIsUploaded: boolean,
  callback: ()=>void
};

const UploadPhoto: React.FC<UploadComponentPropsWrapper> = ({componentProps}) => {
  const dispatch = useDispatch();

  const apiUrl = process.env.API_URL;

  const props: UploadProps = {
    name: "file",
    action: `${apiUrl}/${componentProps.endpoint}/${componentProps.queryId}`,
    data: componentProps.additionalRequestParam,
    headers: {
      "X-CSRF": "1"
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        componentProps.callback();
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default UploadPhoto;
