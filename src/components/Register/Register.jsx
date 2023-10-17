import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [isLodaing, setisLoading] = useState(false)
  async function registerSubmit(values) {
    setisLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch((err) => {
          setisLoading(false)
          seterror(err.response.data.message)
        }
      )
    if (data.message === 'success') {
      setisLoading(false)
      navigate('/login')
    }
  }
    /*  function validate(values) {
       let phoneRegex = /^\+?(\d{1,3})?[ -]?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})$/
       let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
       let errors = {}
       if (!values.name) {
         errors.name = 'name is required'
       } else if (values.name.length < 3) {
         errors.name = 'name can\'t be less than 3'
       } else if (values.name.length > 10) {
         errors.name = 'name can\'t be more than 10'
       }
       if (!values.phone) {
         errors.phone = 'phone is required'
       }
       if (!phoneRegex.test(values.phone)) {
         errors.phone = 'phone number is invalid'
       }
       if (!values.email) {
         errors.email = 'email is required'
       }
       if (!emailRegex.test(values.email)) {
         errors.email = 'email number is invalid'
       }
       return errors;
     } */
    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    let validationSchema = Yup.object({
      name: Yup.string().min(3, 'minimum is three characters').max(10, 'maximum is ten characters').required('name is required'),
      email: Yup.string().email('email is invalid').required('email is required'),
      phone: Yup.string().matches(phoneRegExp, 'phone is invalid').required('phone is required'),
      password: Yup.string().matches(/[A-Z][a-z0-9]{5,10}$/, 'password start with uppercase and minimum of 6 digits').required('password is required'),
      rePassword: Yup.string().oneOf([Yup.ref('password')], 'not matching the password').required('rePassword is required')
    })
    let formik = useFormik({
      initialValues: {
        name: '',
        phone: '',
        email: '',
        password: '',
        rePassword: ''
      }, validationSchema,
      onSubmit: registerSubmit
    })
    return <>
      <div className='w-75 mx-auto py-5'>
        {error !== null ? <div className="alert alert-danger">{error}</div> : ''}

        <h3>Register Now</h3>
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor='name'>Name:</label>
          <input onChange={formik.handleChange} type='text' onBlur={formik.handleBlur} value={formik.values.name} className='form-control' name='name' id='name' />
          {formik.errors.name && formik.touched.name ?
            <div className='alert alert-danger'>{formik.errors.name}</div> : ''}

          <label htmlFor='email'>E-mail:</label>
          <input onChange={formik.handleChange} type='email' onBlur={formik.handleBlur} value={formik.values.email} className='form-control' name='email' id='email' />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

          <label htmlFor='phone'>phone:</label>
          <input onChange={formik.handleChange} type='tel' onBlur={formik.handleBlur} value={formik.values.phone} className='form-control' name='phone' id='phone' />
          {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}

          <label htmlFor='password'>password:</label>
          <input onChange={formik.handleChange} type='password' onBlur={formik.handleBlur} value={formik.values.password} className='form-control' name='password' id='password' />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}


          <label htmlFor='rePassword'>rePassword:</label>
          <input onChange={formik.handleChange} type='password' onBlur={formik.handleBlur} value={formik.values.rePassword} className='form-control' name='rePassword' id='rePassword' />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

          {isLodaing ? <button className="btn bg-main text-white mt-2" type="button">
            <i className="fas fa-spinner fa-spin    "></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>}

        </form>
      </div>
    </>
  }