import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logout } from '../Reducer/userReducer'
const Header = () => {
  
  const account = useSelector(state => state.user.useraccount)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const RenderLogin = () =>{
    if(account)
    {
      
      return <>
       <div className="dropdown me-3">
  <button className="btn btn-primary bg-green btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Hello,  <span className='text-light fw-bold'>{account.name}</span>
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" style={{maxWidth:60}}>

    <li><NavLink className="dropdown-item " onClick={()=>{
        localStorage.removeItem("Account")
        const logout = Logout();
        dispatch(logout)
    }}>Logout</NavLink></li>
    <li><NavLink className="dropdown-item" onClick={()=>{
       
    }}>My Profile</NavLink></li>
   
  </ul>
</div>

      
      </>
    }
    else{
      return  <NavLink to={"/admin/login"} className="btn btn-success btn-sm me-5 px-3 fw-bold btnlogin"><i className='fa fa-user me-2'></i> Login</NavLink>


    }
  }


  return (
    <nav className="navbar navbar-expand-lg mt-2 " style={{ position: 'sticky', top: 0, 'zIndex': 1000, 'background-color': 'white' }} >
      <div className="container-fluid p-0 ">
        <NavLink className="navbar-brand ms-3 " to={'/'}><img src="/images/logo-web.png" alt="" className='img-fluid' /></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto ">
            <li className="nav-item">

              <NavLink className="nav-link active me-3" aria-current="page" to={'/'}><h5 className='' style={{ color: 'rgb(57,219,74)' }}>Home</h5></NavLink>

            </li>
            <li className="nav-item me-3">
              <NavLink className="nav-link" to={'/gaga'}><h5 className=' ' style={{ color: 'black' }}>Menu</h5></NavLink>
            </li>

            <li className="nav-item me-3">
              <NavLink className="nav-link" to={""}><h5 className=' ' style={{ color: 'black' }}>Service</h5></NavLink>
            </li>

            <li className="nav-item me-3">
              <NavLink className="nav-link" to={""}><h5 className=' ' style={{ color: 'black' }}>Offer</h5></NavLink>
            </li>

          </ul>
          <form className="d-flex" >
          <NavLink className="nav-link active me-5"  to={''}>
              <i className='fa fa-search fs-4' style={{ color: 'rgb(57,219,74)' }}></i>
            </NavLink>

            <NavLink className="nav-link active position-relative me-5"  to={''}>
              <i className='fa fa-cart-plus fs-4' style={{ color: 'rgb(57,219,74)' }}></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.6em', padding: '0.2em 0.4em', minWidth: '1.5em', height: '1.5em' }}>
                10
              </span>
            </NavLink>

            

            {/* button here */}
            {RenderLogin()}

          </form>
        </div>
      </div>
    </nav>

  )
}

export default Header