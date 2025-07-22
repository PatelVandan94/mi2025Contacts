import * as yup from 'yup';

const CreateContactSchema = yup.object({
  firstName: yup.string().required('First Name required'),
  lastName: yup.string().required('Last Name required'),
  phoneNumber: yup
  .string()
  .min(10,'Exact 10 digit requires')
  .max(10, 'Exact 10 digit requires')
  .required('Phone Number required'),
  mobileNumber: yup
    .string()
    .min(10,'Exact 10 digit requires')
    .max(11, 'Exact 10 digit requires')
    .required('Mobile Number required'),
  workNumber: yup
    .string()
    .min(10,'Exact 10 digit requires')
    .max(10, 'Exact 10 digit requires')
    .required('Work Number required'),
  homeNumber: yup
    .string()
    .min(10,'Exact 10 digit requires')
    .max(10, 'Exact 10 digit requires')
    .required('Home Number required'),
});

export default CreateContactSchema;
