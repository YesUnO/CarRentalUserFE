import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import {
  approoveAndReload,
  deleteAndReload,
  DocType,
  getCustomerList,
  UserForAdmin,
  verifyAndReload,
} from "../../adminReducer";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import dayjs from "dayjs";
import CopyToClipboard from "../../../../components/CopyToClipboard";

type VerificationFields = {
  idDate: Date;
  idNr: string;
  licenseDate: Date;
  licenseNr: string;
};

const AdminUserManagmentPage: React.FC = () => {
  const dispatch = useDispatch();
  const customersList = useSelector(
    (state: RootState) => state.adminService.customers
  );

  useEffect(() => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(getCustomerList());
  }, []);

  const [verificationFieldsState, setVerificationFieldsState] =
    useState<VerificationFields[]>([{
      idDate: new Date(),
      idNr: "",
      licenseDate: new Date(),
      licenseNr: "",
    }]);

  useEffect(() => {
    const verificationFields: VerificationFields[] = customersList.map(() => {
      return {
        idDate: new Date(),
        idNr: "",
        licenseDate: new Date(),
        licenseNr: "",
      };
    });
    setVerificationFieldsState(verificationFields);
  }, [customersList]);

  const verificationFields = customersList.map(() => {
    return {
      idDate: new Date(),
      idNr: "",
      licenseDate: new Date(),
      licenseNr: "",
    };
  });

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
        render: (email: string) => renderVerifyIdEl(email, index),
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
        render: (email: string) => renderVerifyDrivingLicenseEl(email, index),
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
      title: "Actions",
      key: "actions",
      dataIndex: "email",
      render: (email: string) => renderActions(email),
    }
  ];

  const renderActions = (email: string) => {
    return (
      <>
        <Button onClick={()=>deleteAndReload(email)}>Delete</Button>
        <Button onClick={()=>handleApproove(email)}>Approve</Button>
        {/* <Button></Button> */}
      </>
    )
  }

  const handleApproove = (mail:string) => {
    // @ts-expect-error
    dispatch(approoveAndReload(mail));
  }

  const handleDelete = (mail:string) => {
    // @ts-expect-error
    dispatch(deleteAndReload(mail));
  }

  const handleDatePickerChange = (
    e: dayjs.Dayjs | null,
    index: number,
    name: string
  ) => {
    const value = e?.toDate() as Date;
    if (value == undefined) {
      return;
    }
    handleVerificationFieldsChange(name, index, value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    handleVerificationFieldsChange(name, index, value);
  };


  const handleVerificationFieldsChange = (
    name: string,
    index: number,
    value: string | Date
  ) => {

    const updatedFields = [...verificationFieldsState];
    updatedFields[index] = { ...verificationFieldsState[index], [name]: value };

    setVerificationFieldsState(updatedFields);
  };


const renderUrlEl = (val:string) => {
  return (
    <>
      <div style={{ maxWidth: 200, overflow:"hidden", textOverflow: "ellipsis" }}>{val}</div>
      <CopyToClipboard text={val} />
    </>
  );
}

  const renderVerifyIdEl = (email: string, index: number) => {
    return (
      <>
        <Input
          key={"verId" + index + "n"}
          name="idNr"
          value={verificationFieldsState[index].idNr}
          onChange={(e) => handleInputChange(e, index)}
        ></Input>
        <DatePicker
          name="idDate"
          key={"verId" + index + "d"}
          onChange={(e) => handleDatePickerChange(e, index, "idDate")}
        />
        <Button
          type="link"
          disabled={!isVerifyIdBtnEnabled(index)}
          onClick={() =>
            handleVerifyDoc(
              email,
              verificationFieldsState[index].idNr,
              verificationFieldsState[index].idDate,
              DocType.IdentityCard
            )
          }
        >
          Verify Id card
        </Button>
      </>
    );
  };

  const renderVerifyDrivingLicenseEl = (email: string, index: number) => {
    return (
      <>
        <Input
          key={"verDr" + index + "n"}
          name="licenseNr"
          value={verificationFieldsState[index].licenseNr}
          onChange={(e) => handleInputChange(e, index)}
        />
        <DatePicker
          name="licenseDate"
          key={"verDr" + index + "d"}
          onChange={(e) => handleDatePickerChange(e, index, "licenseDate")}
        />
        <Button type="link" disabled={!isVerifyDrivingLicenseBtnEnabled(index)}
          onClick={() =>
            handleVerifyDoc(
              email,
              verificationFieldsState[index].licenseNr,
              verificationFieldsState[index].licenseDate,
              DocType.DriversLicense
            )
          }>
          Verify driving license
        </Button>
      </>
    );
  };

  const handleVerifyDoc = (
    customerMail: string,
    docNr: string,
    validTill: Date,
    userDocumentType: DocType
  ) => {
    // @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
    dispatch(verifyAndReload({ userDocumentType, docNr, customerMail, validTill }));
  };

  const isVerifyDrivingLicenseBtnEnabled = (index: number) => {
    const result =
      (!!customersList[index].drivingLicenseImgBack || customersList[index].drivingLicenseImgBack != "empty") &&
      (!!customersList[index].drivingLicenseImgFront || customersList[index].drivingLicenseImgFront != "empty") &&
      !customersList[index].hasDrivingLicenseVerified;
    return result;
  };

  const isVerifyIdBtnEnabled = (index: number) => {
    const result =
      (!!customersList[index].idCardImgBack || customersList[index].idCardImgBack != "empty") &&
      (!!customersList[index].idCardImgFront || customersList[index].idCardImgFront != "empty") &&
      !customersList[index].HasIdCardVerified;
    return result;
  };

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
