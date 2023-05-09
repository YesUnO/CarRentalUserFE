import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store";
import { useEffect, useState } from "react";
import { getCars } from "../../Car/carReducer";
import AdminCarThumb from "./components/AdminCarThumb";

const AdminCarPage: React.FC = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.carsService.cars);

  useEffect(() => {
    if (cars.length == 0) {
      // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
      dispatch(getCars());
    }
  }, cars);


  return (
    <>
      <h3>Cars</h3>
      {cars.map((item, index) => (
        <div key={index} onClick={() => { }}>
          <AdminCarThumb props={item} />
        </div>
      ))}
    </>
  );
};

export default AdminCarPage;
