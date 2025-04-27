import * as Yup from 'yup'

const ValidationSchema = Yup.object().shape({
    fullname: Yup.string()
    .min(3,'FullName should be at least length 3')
    .max(50,'FullName should be at most length 50')
    .matches(/^[a-zA-Z\s]+$/, 'FullName should only contain letters and spaces')
    .required('FullName is Required'),

    email: Yup.string()
    .email('Invalid Email')
    .required('Email is Required'),

    phone: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Invalid format"
    )
    .required('Phone number is required'),

    role: Yup.string()
    .oneOf(['donor', 'recipient'], 'Role is required'),

    organization: Yup.string()
    .required('Organization is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Organization should only contain letters, numbers, and spaces'),

    username: Yup.string()
    .min(3, 'Username should be at least 3 characters')
    .max(20, 'Username should be at most 20 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Username should only contain letters and numbers')
    .required('Username is Required'),

    password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required("Password is required"),

    confrimPassword:Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export default ValidationSchema