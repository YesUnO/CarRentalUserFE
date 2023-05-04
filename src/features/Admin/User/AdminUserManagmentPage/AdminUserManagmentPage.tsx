import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/store";
import {
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
  Table,
  TableColumnsType,
} from "antd";
import dayjs from "dayjs";

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
      },
      {
        title: "Id card front Img",
        dataIndex: "idCardImgFront",
        key: "idCardImgFront",
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
      },
      {
        title: "Driving license front Img",
        dataIndex: "drivingLicenseImgFront",
        key: "drivingLicenseImgFront",
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
  ];

  const handleVerificationFieldsChange = (
    name: string,
    index: number,
    value: string | Date
  ) => {
    setVerificationFieldsState((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[index] = { ...updatedFields[index], [name]: value };
      return updatedFields;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    handleVerificationFieldsChange(name, index, value);
  };

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
              verificationFields[index].idNr,
              verificationFields[index].idDate,
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
        ></Input>
        <DatePicker
          name="licenseDate"
          key={"verDr" + index + "d"}
          onChange={(e) => handleDatePickerChange(e, index, "licenseDate")}
        />
      <Button type="link" disabled={!isVerifyDrivingLicenseBtnEnabled(index)} 
      onClick={() =>
        handleVerifyDoc(
          email,
          verificationFields[index].licenseNr,
          verificationFields[index].licenseDate,
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

  const isVerifyIdBtnEnabled = (index: number) => {
    const result =
      !!customersList[index].drivingLicenseImgBack &&
      !!customersList[index].DrivingLicenseImgFront &&
      !customersList[index].hasDrivingLicenseVerified;
    return result;
  };

  const isVerifyDrivingLicenseBtnEnabled = (index: number) => {
    const result =
      !!customersList[index].IdCardImgBack &&
      !!customersList[index].IdCardImgFront &&
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
