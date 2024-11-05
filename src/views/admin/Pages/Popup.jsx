import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusPopup } from '../../user/Reducer/popupReducer';

const Popup = () => {

  const statusPopup = useSelector(state => state.popup.StatusPopup)
  const BorderColor = useSelector(state => state.popup.BorderColor)
  const ContentPopup = useSelector(state => state.popup.ContentPopup)
  const IconImage = useSelector(state => state.popup.IconImage)
  const dispatch = useDispatch();
  const handleClickOutside = (event) => {
   
    const card = document.getElementById('popupCard');
    
    if (card && !card.contains(event.target)) {
          const popupStatus = StatusPopup('none');
          dispatch(popupStatus)
    }
  };

  useEffect(() => {
   
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, []);
  return (
    <div className="card position-fixed  translate-middle " id="popupCard"  style={{ zIndex: 1050 ,minWidth:300,minHeight:300,display:statusPopup,top: '40%', left: '50%',border: `2px solid ${BorderColor}`}}>
  <div  className="card-body d-flex flex-column justify-content-center align-items-center" style={{minHeight:250}} >
    
    

     <img src={`/images/${IconImage}`} alt='' />


     <p className='mt-3 fw-bold fs-3' >{ContentPopup}</p>

    
    
  </div>
</div>

  )
}

export default Popup