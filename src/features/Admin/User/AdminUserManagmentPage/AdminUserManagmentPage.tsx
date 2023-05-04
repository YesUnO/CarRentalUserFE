import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import { getCustomerList, UserForAdmin } from "../../adminReducer";
import { useEffect } from "react";
import { Button, Checkbox, Table, TableColumnsType } from "antd";

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

  type TableData = UserForAdmin & { key: string }


  const expandedRowRender = (row: TableData) => {

    const columns: TableColumnsType<TableData> = [
      { title: "Id card license back Img", dataIndex: "idCardImgBack", key: "idCardImgBack" },
      { title: "Id card license front Img", dataIndex: "idCardImgFront", key: "idCardImgFront" },
      {
        title: "Verify id card",
        dataIndex: "email",
        key: "idVerify",
        render: (email: string,record, index) => renderVerifyIdBtn(email, index)
      },
      { title: "Driving license back Img", dataIndex: "drivingLicenseImgBack", key: "drivingLicenseImgBack" },
      { title: "Driving license front Img", dataIndex: "drivingLicenseImgFront", key: "drivingLicenseImgFront" },
      {
        title: "Verify driving license",
        dataIndex: "email",
        key: "drivingLicenseVerify",
        render: (email: string) => renderVerifyDrivingLicenseBtn(email)
      },
    ]

    return <Table bordered={true} columns={columns} dataSource={[row]} pagination={false} />;
  }

  const columns: TableColumnsType<TableData> = [
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Id Card",
      dataIndex: "hasIdCardVerified",
      key: "hasIdCardVerified",
      render: (value: boolean) => renderBoolean(value)
    },
    {
      title: "Driving license",
      dataIndex: "hasDrivingLicenseVerified",
      key: "hasDrivingLicenseVerified",
      render: (value: boolean) => renderBoolean(value)
    },
    {
      title: "Payment Card",
      dataIndex: "hasActivePaymentCard",
      key: "hasActivePaymentCard",
      render: (value: boolean) => renderBoolean(value)
    },
  ]

  const renderVerifyIdBtn = (email: string, index: number) => {
console.log(index);
    return (
      <Button type="link">Verify Id card</Button>
    );
  }

  const renderVerifyDrivingLicenseBtn = (email: string) => {

    return (
      <Button type="link">Verify driving license</Button>
    );
  }

  const renderBoolean = (value: boolean) => {
    return (
      <Checkbox checked={value} ></Checkbox>
    );
  }

  return (
    <>
      <h3>Customers</h3>
      <Table
        bordered={true}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['1'] }}
        size="middle"
        columns={columns}
        dataSource={tableData}
      />
    </>
  );
};

export default AdminUserManagmentPage;
