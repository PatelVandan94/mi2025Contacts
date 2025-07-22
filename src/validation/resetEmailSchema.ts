import * as yup from 'yup';

const emailValidationSchema = yup.object({
  email: yup.string().email('Enter Valid Email').required('Email Required'),
});

export default emailValidationSchema;
