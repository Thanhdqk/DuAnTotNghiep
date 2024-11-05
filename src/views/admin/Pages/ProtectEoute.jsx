import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectEoute = ({children}) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.useraccount)
   
    useEffect(()=>{
        if(isAuthenticated == null)
            {
                console.log(isAuthenticated)
                navigate("/admin/login")
            }
        
            
            
    },[isAuthenticated, navigate])

    if (isAuthenticated === null) {
        return null; // Không render gì
    }
        

     return children
}

export default ProtectEoute