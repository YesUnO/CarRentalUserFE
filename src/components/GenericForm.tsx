import { Button, Form, Input } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import React, { useEffect } from "react";

export interface IFormField {
    fieldName: string;
    label: string;
    isPassword: boolean;
    errors: string[];
    dependencies?: string[]|undefined;
    rules: Rule[];
}

export interface IGenericForm {
    submitBtnName: string;
    fields: IFormField[];
    submittCallback: (fields: {}) => Promise<void>;
}

export type GenericFormProps = {
    props: IGenericForm;
};

const GenericForm: React.FC<GenericFormProps> = ({ props }) => {
    const formRef = React.useRef<FormInstance>(null);

    useEffect(() => {
        if (formRef.current != null) {
            const newErrors: {name:string, errors: string[]}[] = []; 
            props.fields.forEach((val) => {
                if (val.errors && val.errors.length > 0) {
                    newErrors.push( {
                        name: val.fieldName,
                        errors: val.errors
                    })    
                }
            })
            console.log(newErrors);
            formRef.current.setFields(newErrors);
        }

    }, [props.fields])
    const handleSubmit = async (values: {}) => {
        await props.submittCallback(values);
    };

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
                            dependencies={item.dependencies}
                            validateTrigger="onBlur"
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
        </>
    );
};

export default GenericForm;
