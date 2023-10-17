import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {UserContext} from "../../Context/UserContext";


export default function Login() {
  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [isLodaing, setisLoading] = useState(false)
  async function loginSubmit(values) {
    setisLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch((err) => {
          setisLoading(false)
          seterror(err.response.data.message)
        }
      )
    if (data.message === 'success') {
      setisLoading(false)
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token)
      navigate('/')
    }
  }
    let validationSchema = Yup.object({
      
      email: Yup.string().email('email is invalid').required('email is required'),
      password: Yup.string().matches(/[A-Z][a-z0-9]{5,10}$/, 'password start with uppercase and minimum of 6 digits').required('password is required'),
    })
    let formik = useFormik({
      initialValues: {
      email: '',
      password: ''
      }, validationSchema,
      onSubmit: loginSubmit
    })
    return <>
      <div className='w-75 mx-auto py-5'>
        {error !== null ? <div className="alert alert-danger">{error}</div> : ''}

        <h3>Login Now</h3>
        <form onSubmit={formik.handleSubmit}>


          <label htmlFor='email'>E-mail:</label>
          <input onChange={formik.handleChange} type='email' onBlur={formik.handleBlur} value={formik.values.email} className='form-control' name='email' id='email' />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}


          <label htmlFor='password'>password:</label>
          <input onChange={formik.handleChange} type='password' onBlur={formik.handleBlur} value={formik.values.password} className='form-control' name='password' id='password' />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

          {isLodaing ? <button className="btn bg-main text-white mt-2" type="button">
            <i className="fas fa-spinner fa-spin    "></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Login </button> }

        </form>
      </div>
    </>
  }