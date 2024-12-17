import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab } from "@mui/material";
import { IconArrowDownRight, IconCurrencyDollar } from "@tabler/icons-react";
import DashboardCard from "../../../components/shared/DashboardCard";

const MonthlyEarnings = () => {
  // chart color
  const theme = useTheme();
  const errorlight = "#fdede8";
  const currentMonth = new Date().getMonth() + 1;
  const [doanhThu, setDoanhThu] = useState(0);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/getDoanhThu")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setDoanhThu(data || 0);
  //     });
  // });

  useEffect(() => {
    fetch("http://localhost:8080/api/getDoanhThu")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dữ liệu từ API:", data);
        setDoanhThu(data);
        // Kiểm tra và lấy giá trị revenue
        // if (data && typeof data === "object" && data.revenue) {
        //   //setDoanhThu(data.revenue);
        //   console.log("Doanh thu:", data.revenue);
        // } else {
        //   setDoanhThu(0);
        // }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setDoanhThu(0);
      });
  }, []);
  return (
    <DashboardCard
      title={`Doanh thu tháng ${currentMonth}`}
      action={
        <Fab color="secondary" size="medium" sx={{ color: "#ffffff" }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
    >
      <Typography variant="h3" fontWeight="700" mt="-20px">
        {doanhThu || 0} VND
      </Typography>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
