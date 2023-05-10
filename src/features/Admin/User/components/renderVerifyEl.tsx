import { DocType, verifyAndReload } from "../../adminReducer";
import { Button, DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../../infrastructure/store";

interface RenderVerifyElProps {
    email: string, index: number, docType: DocType,
};

type VerificationFields = {
    idDate: Date;
    idNr: string;
    licenseDate: Date;
    licenseNr: string;
  };

const RenderVerifyEl: React.FC<RenderVerifyElProps> = (props: {email: string, index: number, docType: DocType, }) => {
    const dispatch = useDispatch();

    const { email, index, docType, } = props;
    const customersList = useSelector((state:RootState)=>state.adminService.customers);

    const [verificationFieldsState, setVerificationFieldsState] =
        useState<VerificationFields>({
            idDate: new Date(),
            idNr: "",
            licenseDate: new Date(),
            licenseNr: "",
        });

    const getField = (docType: DocType) => {
        const { idNr, idDate, licenseNr, licenseDate } = verificationFieldsState;
        if (docType === DocType.IdentityCard) {
            return { nr: idNr, date: idDate };
        } else if (docType === DocType.DriversLicense) {
            return { nr: licenseNr, date: licenseDate };
        }
        return { nr: null, date: null }
    };

    const getFieldName = (docType: DocType) => {
        if (docType === DocType.IdentityCard) {
            return { nrName: "idNr", dateName: "idDate" };
        } else if (docType === DocType.DriversLicense) {
            return { nrName: "licenseNr", dateName: "licenseDate" };
        }
        return { nrName: null, dateName: null }
    };

    const isVerifyDrivingLicenseBtnDisabled = (index: number) => {
        const result =
            !customersList[index].drivingLicenseImgBack ||
            customersList[index].drivingLicenseImgBack == "empty" ||
            !customersList[index].drivingLicenseImgFront ||
            customersList[index].drivingLicenseImgFront == "empty" ||
            customersList[index].hasDrivingLicenseVerified;
        return result;
    };

    const isVerifyIdBtnDisabled = (index: number) => {
        const result =
            !customersList[index].idCardImgBack ||
            customersList[index].idCardImgBack == "empty" ||
            !customersList[index].idCardImgFront ||
            customersList[index].idCardImgFront == "empty" ||
            customersList[index].HasIdCardVerified;
        return result;
    };

    const handleDatePickerChange = (
        e: dayjs.Dayjs | null,
        name: string
    ) => {
        const value = e?.toDate() as Date;
        if (value == undefined) {
            return;
        }
        handleVerificationFieldsChange(name, value);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        handleVerificationFieldsChange(name, value);
    };

    const handleVerificationFieldsChange = (
        name: string,
        value: string | Date
    ) => {

        setVerificationFieldsState({ ...verificationFieldsState, [name]: value });
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

    const { nr, date } = getField(docType);
    const { nrName, dateName } = getFieldName(docType);
    return (
        <>
            <Input
                key={nrName as string + index + "n"}
                name={nrName as string}
                value={nr as string}
                onChange={(e) => handleInputChange(e)}
            ></Input>
            <DatePicker
                name={dateName as string}
                key={dateName as string + index + "d"}
                onChange={(e) => handleDatePickerChange(e, dateName as string)}
                picker="month"
            />
            <Button
                type="link"
                disabled={docType == DocType.IdentityCard ? isVerifyIdBtnDisabled(index) : isVerifyDrivingLicenseBtnDisabled(index)}
                onClick={() =>
                    handleVerifyDoc(
                        email,
                        nr as string,
                        date as Date,
                        DocType.IdentityCard
                    )
                }
            >
                {docType == DocType.IdentityCard ? "Verify Id card" : "Verify driving license"}
            </Button>
        </>
    );
};

export default RenderVerifyEl;