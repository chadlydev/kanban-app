import { Field } from 'formik';
import { Label, Checkbox } from './index';

export const CheckboxGroup = ({ label, name, options, ...props }) => {
    return (
        <Label variant='input' htmlFor={label} {...props}>
            {label}
            <Field name={name} {...props}>
                {({ field }) => {
                    return options.map(option => (
                        <Label
                            variant='checkbox'
                            htmlFor={option.value}
                            key={option.value}
                            checked={field.value.includes(option.value)}
                        >
                            <Checkbox
                                type='checkbox'
                                id={option.value}
                                {...field}
                                value={option.value}
                                checked={field.value.includes(option.value)}
                            />
                            {option.key}
                        </Label>
                    ));
                }}
            </Field>
        </Label>
    );
};