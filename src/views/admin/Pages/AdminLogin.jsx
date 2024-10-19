
import React from 'react';
// Đường dẫn tương ứng tới file CSS
import './LoginAdmin.css'
import { useFormik, validateYupSchema } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../../user/Reducer/userReducer';
import { useDispatch } from 'react-redux';
import { BorderColor, ContentPopup, IconImage, StatusPopup } from '../../user/Reducer/popupReducer';
const AdminLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useFormik({
        initialValues: ({
            email: '',
            password: ''
        }
        ),
        onSubmit: (values) => {
            const { email, password } = values;
            console.log("email", email);
            console.log("password", password)
            
            // form.setValues({
            //     email: rowData.email,
            //     password: rowData.password
            //   });

            const APILogin = async () => {
                const res = await axios(
                    {
                        url: "http://localhost:8080/login/admin",
                        method: 'POST',
                        data: {
                            email: email,
                            password: password
                        }, 
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                 // viết code xử lí ở đây
                if(res.data)
                {
                    const dispatchAPILOGIN = LoginAPI(res.data);
                    dispatch(dispatchAPILOGIN);
                  
                    localStorage.setItem('Account',JSON.stringify(res.data));
                    const popupdispatch = StatusPopup('block');
                    const popupBoderDispatch = BorderColor('rgb(57, 219, 74)')
                    const popupContentDispatch = ContentPopup("Login Success")
                    const IconImageDispathch = IconImage('green-tick.png')
                    dispatch(IconImageDispathch);
                    dispatch(popupBoderDispatch);
                    dispatch(popupContentDispatch);
                    dispatch(popupdispatch);
                    navigate('/admin/dashboard');

                }
                else
                {
                    const popupdispatch = StatusPopup('block');
                    const popupBoderDispatch = BorderColor('rgb(255, 0, 0)')
                    const popupContentDispatch = ContentPopup("Login Error")
                    const IconImageDispathch = IconImage('red-x.png')
                    dispatch(IconImageDispathch);
                    dispatch(popupContentDispatch);
                    dispatch(popupBoderDispatch);
                    dispatch(popupdispatch);
                   
                }

               
              
            }

            APILogin();
        },
        validationSchema: yup.object().shape({
            email: yup.string().required("Please enter Email").email("Email is invalid"),
            password: yup.string().required("Please enter Password")

        })
    })

    return (
        <div className="container-fluid" style={{
            backgroundImage: `url('/images/bg-loginadmin.png')`,
            minHeight: '100vh', // Đổi từ height sang minHeight
            backgroundSize: 'cover', // Cho phép background mở rộng theo card
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',

        }}>

            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-4">
                        <div className="card-body">
                            <form onSubmit={form.handleSubmit}>
                                <h1 className="mb-4 text-center text-green">LOGIN</h1>
                                <p className="text-secondary mb-4 text-center">Sign in to your account</p>
                                <div className="mb-1 input-group">
                                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                    <input onChange={form.handleChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        autoComplete="email"
                                        name='email'
                                    />

                                </div>
                                { form.errors.email && <i className='float-end text-danger fw-bold my-2'>{form.errors.email}</i>}

                                <div className="mt-3 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input onChange={form.handleChange}
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        name='password'
                                    />
                                </div>
                                { form.errors.password && <i className='float-end text-danger my-2 fw-bold'>{form.errors.password}</i>}

                                <div className="my-4 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <button type="submit" className="btn btn-primary w-100 ">Login</button>
                                    </div>
                                    <div className="col-xs-6 text-end">
                                        <button type="button" className="btn btn-link text-green">Forgot password?</button>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;