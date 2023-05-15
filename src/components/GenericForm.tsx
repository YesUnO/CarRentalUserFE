import { Button, Form, Input } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import React, { useState } from "react";

export interface IFormField {
    fieldName: string;
    label: string;
    isPassword: boolean;
    error: string;
    rules: Rule[];
}

export interface IGenericForm {
    submitBtnName: string;
    fields: IFormField[];
    submittCallback: (fields: {}) => Promise<void>;
    clearErrorCallback: (fieldName: string) => Promise<void>;
}

export type GenericFormProps = {
    props: IGenericForm;
};

const GenericForm: React.FC<GenericFormProps> = ({ props }) => {
    const formRef = React.useRef<FormInstance>(null);

    const handleSubmit = async (values: {}) => {
        await props.submittCallback(values);
        // await timeout(1000);
        // await formRef.current?.validateFields();
    };

    const handleFieldChange = async (item: IFormField) => {
        if (item.error == "") {
            return;
        }

        // await props.clearErrorCallback(item.fieldName);
    }

    return (
        <>
            <Form
                ref={formRef}
                onFinish={handleSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
            >
                {props.fields.map((item) => (
                    <React.Fragment key={`${props.submitBtnName}${item.label}`}>
                        <Form.Item
                            label={item.label}
                            name={item.fieldName}
                            rules={item.rules}
                            validateTrigger = {false}
                        // validateStatus={
                        //     (formRef.current?.isFieldTouched(item.fieldName) && formRef.current?.getFieldError(item.fieldName).length != 0) ||
                        //         item.error ?
                        //         "error" : undefined
                        // }

                        >
                            {item.isPassword ? (
                                <>
                                    <Input.Password onChange={() => handleFieldChange(item)} />
                                </>
                            ) : (
                                <>
                                    <Input onChange={() => handleFieldChange(item)} />
                                </>
                            )}
                        </Form.Item>
                    </React.Fragment>
                ))}
                <Form.Item
                    key={`${props.submitBtnName}btn`}
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        {props.submitBtnName}
                    </Button>
                </Form.Item>
            </Form>
            <Button onClick={()=>formRef.current?.validateFields()}>test</Button>
        </>
    );
};

export default GenericForm;
