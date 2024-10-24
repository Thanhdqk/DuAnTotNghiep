import React from 'react'
import { useSelector } from 'react-redux'

const Loading = () => {

    const loadingstatus = useSelector(state => state.Loadingga.loading)

  return (
    <div style={{display: loadingstatus,position:'fixed',zIndex:999,top:0,left:0,width:'100%',height:'100%',background:'rgba(0,0,0,0.5)'}}>

    <div className='w-100 h-100 d-flex justify-content-center align-items-center '>

    <img src="./images/loading.webp" alt="" style={{width:'5%'}} />

    </div>

    </div>
  )
}

export default Loading