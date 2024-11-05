import axios, { Axios } from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const LoginAdmin = () => {
  const navigate = useNavigate();
  const form = useFormik({
      initialValues:{
        email:'',
        password:''
      },
      onSubmit:  (values) => {
        console.log(values);
        const { email, password } = values;

        const apt = async()=>{
         const res= await axios({url:'http://localhost:8080/login',method:'POST',data:{
          email:email,
          password:password
         },
         headers: {
             'Content-Type': 'application/json'
         }})
         if(res.data==true)
         {
          navigate('/')
         }
         else{

         }
         console.log("ga",res.data)
        }
        const api = async ()=>{
          const res = await axios({url:'http://localhost:8080/filldate',method:'GET'})
          console.log(res.data)
        }
        api();
        apt();
     
    },
    
      validationSchema:yup.object().shape({
        email:yup.string().required('Email can not be blank').email("Email is not valid"),
        password:yup.string().required('Password can not be blank')


      })




  })


  return (
    <div className="row hd  pt-3 pb-5  m-0">
      <div className="col-md-12  ">
        <div className="card w-75 mx-auto">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5 border border-1 border-dark rounded-4 ps-4" style={{ backgroundColor: 'blue' }}>
                <div className="row text-center">
                  <div className="col-md-12">
                    <h1 className="fw-bold text-light mt-5">
                      ĐĂNG NHẬP
                    </h1>
                  </div>
                </div>
                
              </div>
              <div className="col-md-7 ps-5">
                <h1 className="mt-2"> Chào mừng, quay lại</h1>
                <h5>Rất vui được gặp bạn</h5>
                <div className="row me-5">
                  <div className="col-md-12 ">
                    <form onSubmit={form.handleSubmit}>
                      <h3 className="text-primary fw-bold mt-3 ">Tài khoản</h3>
                      <input className="form-control mb-2 mt-3 " onChange={form.handleChange} onBlur={form.handleBlur} id='email'  name="email" placeholder="Email address" type="text"  />
                      {form.errors.email && <p className='text-danger my-1'>{form.errors.email}</p>}
                      <h3 className="text-primary fw-bold ">Mật khẩu</h3>
                      <input className="form-control mb-2" id='password' onChange={form.handleChange} onBlur={form.handleBlur}  name="password" placeholder="Password" type="password" />
                      {form.errors.password && <p className='text-danger my-1'>{form.errors.password}</p>}
                      <button type="submit" className="btn btn-primary" >
                      ĐĂNG NHẬP
                  </button>
                    </form>
                  </div>
                </div>
                <div className="row me-5">
                  <div className="col-md-6 mt-3">
                    <div className="form-check">
                      <input className="form-check-input" style={{ border: '1px solid blue' }} type="checkbox" defaultValue id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Lưu mật khẩu
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mt-3 ">
                    <a className="float-end" href="#!quenmatkhau">Quên mật khẩu ?</a>
                  </div>
                </div>
               
                <div className="row mt-2 me-5">
                
                   
                
                </div>
                <div className="row mt-4 mb-2">
                  <h4>chưa có tài khoản ? <a className="h5 text-primary" href="#!dangki">Đăng kí</a>
                  </h4>
                </div>
                <div className="row mt-1 me-5">
                  <a className="btn  hd text-light fw-bold  " style={{ border: '1px solid white' }} href="#!doimatkhau">ĐỖI MẬT
                    KHẨU</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginAdmin