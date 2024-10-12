import React from 'react'

const PopupAD = () => {
  return (
    <>
    {/* Modal */}
    <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div  className="modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-header" style={{borderBottom:'none'}}>
           
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{minHeight:'200px'}}>
          <div className="d-flex justify-content-center">


            <img className='img-fluid' src="/images/product2.png" alt="" />
            

           

          </div>
          
          <h3>Dưa hấu RED</h3>
        
          </div>
          
        </div>
      </div>
    </div>
  </>

  )  
}

export default PopupAD