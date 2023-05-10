import { Button, Form, Input } from "antd";
import { FormEvent, useState } from "react";

export interface IFormField {
    fieldName: string,
    fieldValue: string | number,
    fieldType?: string,
    fieldPlaceholder?: string,
    key: string
};

export interface IGenericForm {
    submitBtnName: string,
    fields: IFormField[]
    callback: (fields: IFormField[]) => Promise<void>
};

export type GenericFormProps = {
    props: IGenericForm
};


const GenericForm: React.FC<GenericFormProps> = ({ props }: GenericFormProps) => {
    const [formData, setFormData] = useState<IFormField[]>(
        props.fields
    );

    const updateValue = (index: number, newValue: string) => {
        const newFields = formData.map((item, i) => {
            return i === index ? { ...item, fieldValue: newValue } : item;
        })
        setFormData(newFields);
    }

    const handleSubmit = async (values: any) => {

        console.log(values);
        // await props.callback(formData);
    };

    return (
        <>
            <Form
                onFinish={handleSubmit}
            >
                {formData.map((item, index) => (
                    <>
                        <Form.Item
                        label={item.fieldName}
                        name= {item.fieldName}
                        >
                            <Input/>
                        </Form.Item>
                        {/* <div key={item.key}>
                            <div>{item.fieldName}</div>
                            <input
                                type={item.fieldType ?? "text"}
                                value={item.fieldValue}
                                onChange={(e) => updateValue(index, e.target.value)}
                                placeholder={item.fieldPlaceholder ?? ""}
                            />
                        </div> */}
                    </>
                ))}
                <Form.Item>
                    <Button htmlType="submit">{props.submitBtnName}</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default GenericForm;