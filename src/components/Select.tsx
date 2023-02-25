import { useField } from 'formik'
import { ReactElement } from 'react';
interface Props {
  label: string;
  name: string;
  children?: Array<ReactElement>;
}

const Select = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error 
        ? <div>{meta.error}</div> : null}
    </div>
  )
}

export default Select
