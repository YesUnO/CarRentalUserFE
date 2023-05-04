import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { getCustomerList, UserForAdmin } from "../../adminReducer";
import { useEffect } from "react";
import { Table, TableColumnsType } from "antd";

const AdminUserManagmentPage: React.FC = () => {
  const dispatch = useDispatch();
  const customersList = useSelector(
    (state: RootState) => state.adminService.customers
  );

  useEffect(() => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCustomerList());
  }, []);

  const tableData: TableData[] = customersList.map((value) => {
    return { key: value.email as string, ...value }
  })

  type TableData = UserForAdmin & {key: string}

  const columns:TableColumnsType<TableData> = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Id Card", dataIndex: "hasIdCardVerified", key: "hasIdCardVerified" },
    { title: "Payment Card", dataIndex: "hasActivePaymentCard", key: "hasActivePaymentCard" },
  ]

  return (
    <>
      <h3>Customers</h3>
      <Table
        columns={columns}
        dataSource={tableData}
      />
    </>
  );
};

export default AdminUserManagmentPage;
