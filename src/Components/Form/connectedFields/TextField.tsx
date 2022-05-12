import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import OriginalTextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import InputMask from 'react-input-mask';




interface Props {
    name: string,
    label: string,
    mask: string
    variant?: 'outlined | filled | standard'
}
const TextField = (props:Props)  => {
    const {name, label, mask, variant} = props
    const formik:any = useFormikContext()

    const fieldProps = {
        id: name,
        name,
        value:formik.values[name],
        onChange:formik.handleChange,
    }
    const textFieldProps = {
        label,
        error:formik.touched[name] && Boolean(formik.errors[name]),
        helperText:formik.touched[name] && formik.errors[name]
    }

  return (
  <>
    {mask === "" && <OriginalTextField {...fieldProps} {...textFieldProps} variant={variant as any}/>}
    {mask !== "" && 
    <FormControl error={textFieldProps.error} variant={variant as any}>
        <InputLabel htmlFor={fieldProps.id}>{textFieldProps.label}</InputLabel>
        <Input {...fieldProps} inputProps={{mask, maskChar: ""}} inputComponent={InputMask as any} />
        {textFieldProps.helperText && <FormHelperText>{textFieldProps.helperText}</FormHelperText>}
    </FormControl>
    }
  </>
  )
  
}
TextField.defaultProps = {
    mask: "",
    variant: 'standard'
}

export default TextField