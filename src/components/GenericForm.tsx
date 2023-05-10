import { Button, Form, Input } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";

export interface IFormField {
    fieldName: string,
    label: string,
    isPassword: boolean,
};

export interface IGenericForm {
    submitBtnName: string,
    fields: IFormField[]
    callback: (fields: []) => Promise<void>
};

export type GenericFormProps = {
    props: IGenericForm
};

export interface CanClearForm {
    clearForm(): void
}

const GenericForm = forwardRef<CanClearForm, GenericFormProps>(({ props }, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            clearForm() {
                console.log("cleaning");
                setFormData(initalVal);
            },
        })
    )
    const initalVal = props.fields;
    const [formData, setFormData] = useState<IFormField[]>(
        props.fields
    );

    const handleSubmit = async (values: []) => {
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
                {formData.map((item) => (
                    <>
                        <Form.Item
                            key={`${props.submitBtnName}${item.label}`}
                            label={item.label}
                            name={item.fieldName}
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
                <Form.Item>
                    <Button htmlType="submit">{props.submitBtnName}</Button>
                </Form.Item>
            </Form>
        </>
    );
});

export default GenericForm;