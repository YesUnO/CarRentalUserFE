import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { Button, Upload, UploadProps, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const UploadPhoto: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector(
    (state: RootState) => state.authService.token
  );

  const formData = new FormData();

  const apiUrl = process.env.API_URL;


  const props: UploadProps = {
    name: "file",
    action: `${apiUrl}/api/car/1`,
    headers: {
      authorization: token as string,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
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
