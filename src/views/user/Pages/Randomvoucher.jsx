import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const Randomvoucher = () => {
  // Danh sách phần thưởng
  const data = [
    { option: "Voucher 50k", style: { backgroundColor: "#eae56f" } },
    { option: "Voucher 100k", style: { backgroundColor: "#89f26e" } },
    { option: "Voucher 200k", style: { backgroundColor: "#7de6ef" } },
    { option: "Thử lại", style: { backgroundColor: "#e7706f" } },
    { option: "Voucher 300k", style: { backgroundColor: "#eae56f" } },
    { option: "Voucher 500k", style: { backgroundColor: "#89f26e" } },
    { option: "Voucher 1 triệu", style: { backgroundColor: "#7de6ef" } },
    { option: "Thử lại", style: { backgroundColor: "#e7706f" } },
  ];

  const [mustSpin, setMustSpin] = useState(false); // Quản lý trạng thái quay
  const [prizeNumber, setPrizeNumber] = useState(0); // Số chỉ mục được chọn

  // Xử lý khi nhấn nút quay
  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length); // Random phần thưởng
    setPrizeNumber(newPrizeNumber); // Gán phần thưởng
    setMustSpin(true); // Bắt đầu quay
  };

  return (
    <div className="row">
      <h3 className="text-center">Vòng quay may mắn</h3>
      <div className="col-md-12 d-flex justify-content-center">
     
      <Wheel 
        mustStartSpinning={mustSpin} // Trạng thái quay
        prizeNumber={prizeNumber} // Chỉ mục phần thưởng
        data={data} // Dữ liệu vòng quay
        onStopSpinning={() => {
          setMustSpin(false); // Dừng quay
          alert(`Chúc mừng! Bạn nhận được: ${data[prizeNumber].option}`);
        }}
        backgroundColors={["#3e3e3e", "#df3428"]} // Màu nền mặc định
        textColors={["#ffffff"]} // Màu chữ
      />
      
    </div>
    <div className="col-md-12 text-center">
    <button
        onClick={handleSpinClick}
        disabled={mustSpin}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Quay Ngay!
      </button>
    </div>
      </div>

    
  );
};

export default Randomvoucher;
