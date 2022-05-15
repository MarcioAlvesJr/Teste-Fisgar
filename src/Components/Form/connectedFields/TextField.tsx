import { Collapse, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import OriginalTextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import InputMask from 'react-input-mask';


export const CustomCollapse = ({text}) =>            
<Collapse component='span'  in={Boolean(text)}>
{text}
</Collapse>

interface Props {
    name: string,
    label: string,
    mask: string,
    multiline?: boolean,
    fullWidth?: boolean,
    variant?: 'outlined | filled | standard'
}
const TextField = (props:Props)  => {
    const {name, label, mask, variant, multiline, fullWidth} = props
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
    
    <FormControl error={textFieldProps.error} variant={variant as any} {...{fullWidth}}>
        <InputLabel htmlFor={fieldProps.id}>{textFieldProps.label}</InputLabel>
        {mask === "" && <Input {...fieldProps} {...{multiline}}/>}
        {mask !== "" &&<Input {...fieldProps} inputProps={{mask, maskChar: ""}} inputComponent={InputMask as any} />}
        <FormHelperText component='div'><CustomCollapse text={textFieldProps.helperText}/></FormHelperText>
    </FormControl>
    
  </>
  )
  
}
TextField.defaultProps = {
    mask: "",
    variant: 'standard'
}

export default TextField