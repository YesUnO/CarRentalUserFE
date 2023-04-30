import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { getCustomerList } from "../../adminReducer";
import UserPicker from "../components/userPicker";
import { useEffect } from "react";

const AdminUserManagmentPage: React.FC = () => {
  const dispatch = useDispatch();
  const customersList = useSelector(
    (state: RootState) => state.adminService.customers
  );

  useEffect(() => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCustomerList());
  }, []);

  return (
    <>
    <h3>Customers</h3>
    {customersList.map((item, index)=>(
        <div key={`yo${index}`}>
            <div>{item.email}</div>
        </div>
    ))}
      <UserPicker />
    </>
  );
};

export default AdminUserManagmentPage;
