import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useState } from "react";
import { RootState } from "../../../../infrastructure/store";
import Title from "antd/es/typography/Title";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { Car, getCars } from "../../../Car/carReducer";
import UploadPhoto from "../../../File/components/uploadPhoto";
import { deleteCarPicAndReload } from "../../adminReducer";

export type CarComponentProps = {
  props: Car;
};

const AdminCarThumb: React.FC<CarComponentProps> = ({ props: car }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authService.token != null
  );

  const renderDeleteOrUploadImgEl = () => {
    const hasPicture = car.pictureUrl;
    return (
      <>
        {hasPicture ? (
          <>
            <button onClick={handleDelete}>Delete pic</button>
          </>
        ) : (
          <>
            <UploadPhoto
              componentProps={{
                endpoint: "api/car",
                queryId: car.id,
                additionalRequestParam: undefined,
                fileIsUploaded: false,
                callback: () => handlePostUploadImg()
              }}
            />
          </>
        )}
      </>

    );
  }

  const handlePostUploadImg = () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCars())
  }

  const handleDelete = () => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(deleteCarPicAndReload(car.id))
  }

  const [custom, setCustom] = useState(true);
  const conditionalStyles = classNames({
    highlighted: car.isPicked,
  });

  return (
    <>
      <Card
        className={conditionalStyles}
        style={{ width: 300 }}
        cover={<img src={car.pictureUrl} />}
        actions={[
          renderDeleteOrUploadImgEl(),
          <button key={"yo"}>Delete car</button>
        ]}
      >
        <Meta
          title={car.name}
          description={"to be continued..."}
        />
      </Card>
    </>
  );
};

export default AdminCarThumb;
