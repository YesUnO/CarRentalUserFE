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
    callback: (fields: IFormField[])=> Promise<void>
};

export type GenericFormProps = {
    props : IGenericForm
};


const GenericForm: React.FC<GenericFormProps> = ({props}: GenericFormProps) => {
    const [formData, setFormData] = useState<IFormField[]>(
        props.fields
    );

    const updateValue = (index: number, newValue: string) => {
        const newFields = formData.map((item, i) => {
            return i === index ? { ...item, fieldValue: newValue } : item;
        })
        setFormData(newFields);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await props.callback(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {props.fields.map((item, index) => (
                    <input
                        key={item.key}
                        type={item.fieldType ?? "text"}
                        value={formData[index].fieldValue}
                        onChange={(e) => updateValue(index, e.target.value)}
                        placeholder={item.fieldPlaceholder ?? ""}
                    />
                ))}
                <button type="submit">{props.submitBtnName}</button>
            </form>
        </>
    );
};

export default GenericForm;