import React from 'react'

const Post = () => {
  return (
    <div className='container-fluid '>

    <div className="row mt-5">

        <div className="col-md-6 d-flex justify-content-center">

            <img src="/images/post1.webp" className='img-fluid' style={{borderRadius:'10px'}} alt="" />

        </div>

        <div className="col-md-6">

            <h4 className='ms-2 fw-bold'>CHẢ GIÒ CÁ HỒI</h4>

            <p className='text-muted ms-2 fw-bold'>Cá hồi là loài cá giàu dinh dưỡng được nhiều người yêu thích và chế biến thành nhiều món ăn ngon, bổ dưỡng</p>
            
        </div>

    </div>
    <div className="row mt-5">

        <div className="col-md-6 d-flex justify-content-center">

            <img src="/images/post2.webp" className='img-fluid' style={{borderRadius:'10px'}} alt="" />

        </div>

        <div className="col-md-6">

            <h4 className='ms-2 fw-bold'>SÚP BÍ ĐỎ KEM TƯƠI</h4>

            <p className='text-muted ms-2 fw-bold'>Bí đỏ là thực phẩm truyền thống của ngày hội Halloween và cũng là nguyên liệu có thể chế biến được rất nhiều món ăn  </p>
            
        </div>

    </div>

    </div>
  )
}

export default Post