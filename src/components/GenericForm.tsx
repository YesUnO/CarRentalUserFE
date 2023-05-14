import { Button, Form, Input } from "antd";
import { Rule } from "antd/es/form";
import React from "react";

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
  callback: (fields: {}) => Promise<void>;
}

export type GenericFormProps = {
  props: IGenericForm;
};

const GenericForm: React.FC<GenericFormProps> = ({ props }) => {
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
        {props.fields.map((item, index) => (
          <React.Fragment key={`${props.submitBtnName}${item.label}`}>
            <Form.Item
              label={item.label}
              name={item.fieldName}
              rules={item.rules}
              help={item.error}
              validateStatus={item.error ? "error" : ""}
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
