import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
const Test = () => {
    const changeImage = (event) =>{
        const value = event.currentTarget.files[0];
        const parent = document.querySelector("[gay]");
        const parent2 = document.querySelector("[gay2]");
        console.log(value.name)
        parent.removeChild(parent2)
        console.log(parent)
        const img = document.createElement('img');
        const srcimg =  URL.createObjectURL(value);
        img.setAttribute('src',srcimg);
        img.className = "img-fluid"
        img.style.height='80px'
        parent.appendChild(img)

        img.addEventListener('dblclick',()=>{
            parent.removeChild(img);
            parent.appendChild(parent2)
        })
       

    }
    const formik = useFormik({

        initialValues:{
            phone:'',
            image:''
        },
        onSubmit:(values)=>{
            const {phone,image} =values
                console.log('values',phone);
                console.log('values',image.name);
        },
        validationSchema:yup.object().shape({
            phone:yup.number().typeError("have to enter").min(50000, 'Phone number must be at least 5 digits').max(7000000, 'Phone number must be < 7 digits').required("have to enter phone number"),
            // phone: yup.string()
            // .required('Phone number is required')  // Bắt buộc phải nhập số điện thoại
            // .matches(/^[0-9]+$/, 'Phone number must be only digits')  // Kiểm tra chỉ có số
            // .min(10, 'Phone number must be at least 10 digits')  // Số tối thiểu 10 chữ số
            // .max(15, 'Phone number cannot be longer than 15 digits')  // Số tối đa 15 chữ số

        
            image:yup.mixed().required("have to choose image").test('fileSize','weight < 5 MB', value =>{
                return value && value.size <= 500000000
            })
        })

    })
    return (
        <div className='container'>

            <div className="row">

                <div className="col-md-12">
                    <form onSubmit={formik.handleSubmit}>

                        <input type="text" name='phone' onChange={formik.handleChange} className='form-control mt-3' />
                        {formik.errors.phone && <i className='text-danger text-end-0'>{formik.errors.phone}</i>}
                        


                        
<label gay="sad" className="custum-file-upload" htmlFor="file">
  <div gay2="sad2" className="gay">
  <div  className="icon">
    <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
  </div>
  <div className="text">
    <span>Click to upload image</span>
  </div>
  <input type="file" id='file' name='image' onChange={(event)=>{
                                formik.setFieldValue('image',event.currentTarget.files[0]);
                                changeImage(event);


                        }} className=' mt-3' />
  </div>
</label>



                      
                         {formik.errors.image && <i className='text-danger text-end-0'>{formik.errors.image}</i>}
                        <br />
                        <button type='submit' className='btn btn-danger mt-3'>Submit</button>

                    </form>
                </div>


            </div>
            <script>

                    
            
           </script>
        </div>
       
    )
    
}

export default Test