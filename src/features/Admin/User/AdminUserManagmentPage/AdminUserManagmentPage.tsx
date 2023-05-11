import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import {
  approveAndReload,
  deleteAndReload,
  DocType,
  getCustomerList,
  UserForAdmin,
} from "../../adminReducer";
import { useEffect } from "react";
import {
  Button,
  Checkbox,
  Table,
  TableColumnsType,
} from "antd";
import CopyToClipboard from "../../../../components/CopyToClipboard";
import RenderVerifyEl from "../components/renderVerifyEl";

const AdminUserManagmentPage: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCustomerList());
  }, []);

  const customersList = useSelector(
    (state: RootState) => state.adminService.customers
  );

  const tableData: TableData[] = customersList.map((value) => {
    return { key: value.email as string, ...value };
  });

  type TableData = UserForAdmin & { key: string };

  const expandedRowRender = (row: TableData, index: number) => {
    const columns: TableColumnsType<TableData> = [
      {
        title: "Id card back Img",
        dataIndex: "idCardImgBack",
        key: "idCardImgBack",
        render: (value: string) => renderUrlEl(value),
        ellipsis: true,
      },
      {
        title: "Id card front Img",
        dataIndex: "idCardImgFront",
        key: "idCardImgFront",
        render: (value: string) => renderUrlEl(value),
        ellipsis: true,
      },
      {
        title: "Verify id card",
        dataIndex: "email",
        key: "idVerify",
        render: (email: string) =>(
          <RenderVerifyEl email={email} index={index} docType={DocType.IdentityCard}/>
        ),
      },
      {
        title: "Driving license back Img",
        dataIndex: "drivingLicenseImgBack",
        key: "drivingLicenseImgBack",
        render: (value: string) => renderUrlEl(value),
        ellipsis: true,
      },
      {
        title: "Driving license front Img",
        dataIndex: "drivingLicenseImgFront",
        key: "drivingLicenseImgFront",
        render: (value: string) => renderUrlEl(value),
        ellipsis: true,
      },
      {
        title: "Verify driving license",
        dataIndex: "email",
        key: "drivingLicenseVerify",
        render: (email: string) =>(
          <RenderVerifyEl email={email} index={index} docType={DocType.DriversLicense}/>
        ),
      },
    ];

    return (
      <Table
        bordered={true}
        columns={columns}
        dataSource={[row]}
        pagination={false}
      />
    );
  };

  const columns: TableColumnsType<TableData> = [
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Id Card",
      dataIndex: "hasIdCardVerified",
      key: "hasIdCardVerified",
      render: (value: boolean) => renderBoolean(value),
    },
    {
      title: "Driving license",
      dataIndex: "hasDrivingLicenseVerified",
      key: "hasDrivingLicenseVerified",
      render: (value: boolean) => renderBoolean(value),
    },
    {
      title: "Payment Card",
      dataIndex: "hasActivePaymentCard",
      key: "hasActivePaymentCard",
      render: (value: boolean) => renderBoolean(value),
    },
    {
      title: "Has been approved",
      dataIndex: "isApprooved",
      key: "hasBeenApproved",
      render: (value: boolean) => renderBoolean(value),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "email",
      render: (email: string) => renderActions(email),
    }
  ];

  const renderActions = (email: string) => {
    return (
      <>
        <Button onClick={() => handleDelete(email)}>Delete</Button>
        <Button onClick={() => handleApproove(email)}>Approve</Button>
        {/* <Button></Button> */}
      </>
    )
  }

  const handleApproove = (mail: string) => {
    // @ts-expect-error
    dispatch(approveAndReload(mail));
  }

  const handleDelete = (mail: string) => {
    // @ts-expect-error
    dispatch(deleteAndReload(mail));
  }

  const renderUrlEl = (val: string) => {
    return (
      <>
        <div style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>{val}</div>
        {(val == "empty" || val == null) ? (
          <></>
        ) : (
          <>
            <CopyToClipboard text={val} />
          </>
        )}
      </>
    );
  }

  const renderBoolean = (value: boolean) => {
    return <Checkbox checked={value}></Checkbox>;
  };

  return (
    <>
      <h3>Customers</h3>
      <Table
        bordered={true}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        size="middle"
        columns={columns}
        dataSource={tableData}
      />
    </>
  );
};

export default AdminUserManagmentPage;
