import React, { useState, useEffect } from 'react';

const TestSearch = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Xử lý khi click bên ngoài để đóng popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container') && !event.target.closest('.popup')) {
        setShowPopup(false);
    }
    
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowPopup(true);
  };

 

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Tìm kiếm"
        onClick={handleInputClick}
      />
      
      {showPopup && (
        <div className="popup " >
          <div className="popup-content ">
            <div className="history row w-50 mx-auto" style={{borderRadius:'15px',boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.3)'}}>

              
              <div className="col-md-6">
              <h3>Lịch sử</h3>
              <ul>
                <li>gà</li>
              </ul>

              </div>
              <div className="col-md-6">

              <div className="keywords">
              <h3>Từ khóa phổ biến</h3>
              <ul>
              <li>gà</li>
              <li>gà</li>
              <li>gà</li>
              <li>gà</li>
              <li>gà</li>
              <li>gà</li>
              <li>gà</li>
              <li>gà</li>
              </ul>
            </div>
              </div>
              
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default TestSearch;
