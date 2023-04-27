import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store";
import { useEffect, useState } from "react";
import { getCars } from "../Car/carReducer";
import UploadPhoto from "../File/components/uploadPhoto";
import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );
  const cars = useSelector((state: RootState) => state.carsService.cars);

  useEffect(() => {
    if (cars.length == 0) {
      // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
      dispatch(getCars());
    }
  }, cars);

  const items: MenuProps["items"] = cars.map((value,index) => {
    return { label: value.name, key: index };
  });

  const [carindex, setCarId] = useState(0);

  const onClick: MenuProps['onClick'] = ({key}) => {
    setCarId(parseInt(key));
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Dropdown menu={{ items, onClick }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {`Car: ${cars[carindex].name}, ${cars[carindex].id}`}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <UploadPhoto
            componentProps={{
              endpoint: "api/car",
              queryId: cars[carindex].id,
              additionalRequestParam: undefined,
            }}
          />
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
    </>
  );
};

export default AdminPage;
