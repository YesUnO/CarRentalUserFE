import { Button, Form, Input } from "antd";
import { Rule } from "antd/es/form";
import { useState, forwardRef, useImperativeHandle } from "react";

export interface IFormField {
    fieldName: string,
    label: string,
    isPassword: boolean,
    error: string;
    rules: Rule[],
};

export interface IGenericForm {
    submitBtnName: string,
    fields: IFormField[]
    callback: (fields: {}) => Promise<void>
};

export type GenericFormProps = {
    props: IGenericForm
};

export interface CanClearForm {
    clearForm(): void;
    pushErrors(fieldName: string, error: string): void;
}

const GenericForm = forwardRef<CanClearForm, GenericFormProps>(({ props }, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            clearForm() {
                // setFormData(initalVal);
            },
            pushErrors(fieldName: string, error: string) {
                // const updatedFormData = formData.map((value)=>{
                //     if (value.fieldName == fieldName) {
                //         value.rules.push()
                //     }
                // });
                // setFormData(updatedFormData);
            },
        })
    )
    
    const initalVal = props.fields;
    const [formData, setFormData] = useState<IFormField[]>(
        props.fields
    );

    const handleSubmit = async (values: {}) => {
        await props.callback(values);
    };

    return (
        <>
            <Form
                onFinish={handleSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
            >
                {props.fields.map((item) => (
                    <>
                        <Form.Item
                            key={`${props.submitBtnName}${item.label}`}
                            label={item.label}
                            name={item.fieldName}
                            rules={item.rules}
                            help={item.error}
                            validateStatus={item.error?"error":""}
                        >
                            {item.isPassword ? (
                                <>
                                    <Input.Password />
                                </>
                            ) : (
                                <>
                                    <Input />
                                </>
                            )}
                        </Form.Item>
                    </>
                ))}
                <Form.Item key={`${props.submitBtnName}btn`} wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">{props.submitBtnName}</Button>
                </Form.Item>
            </Form>
        </>
    );
});

export default GenericForm;