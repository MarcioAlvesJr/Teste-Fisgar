import OriginalTextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';



interface Props {
    name: string,
    label: string
}
const TextField = (props:Props)  => {
    const {name, label} = props
    const formik:any = useFormikContext()
    debugger


    const textFieldProps = {
        id: name,
        name,
        label,
        value:formik.values[name],
        onChange:formik.handleChange,
        error:formik.touched[name] && Boolean(formik.errors[name]),
        helperText:formik.touched[name] && formik.errors[name],
    }

  return <OriginalTextField {...textFieldProps}/>
  
}

export default TextField