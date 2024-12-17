import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "../../../components/shared/DashboardCard";
import Chart from "react-apexcharts";
import axios from "axios";

const SalesOverview = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]); // Dữ liệu doanh thu theo tháng
  const [year, setYear] = useState(2024);

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // Gọi API để lấy doanh thu cho năm được chọn
  useEffect(() => {
    fetchMonthlyRevenue(year);
  }, [year]);

  const fetchMonthlyRevenue = async (selectedYear) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getDoanhThuChart?year=${selectedYear}`
      );
      setMonthlyRevenue(response.data || []); // Giả sử API trả về mảng doanh thu theo tháng
    } catch (error) {
      console.error("Lỗi khi lấy doanh thu: ", error);
      setMonthlyRevenue([]);
    }
  };
  // const fetchMonthlyRevenue = async (selectedYear) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/getDoanhThuChart?year=${selectedYear}`
  //     );

  //     console.log("Dữ liệu từ API doanh thu chart:", response.data);

  //     // Mảng mặc định cho 12 tháng, giá trị ban đầu là 0
  //     const defaultRevenue = Array(12).fill(0);

  //     // Giả sử dữ liệu API trả về dạng [{ month: 1, revenue: 100 }, ...]
  //     if (Array.isArray(response.data)) {
  //       response.data.forEach((item) => {
  //         if (item.month >= 1 && item.month <= 12) {
  //           defaultRevenue[item.month - 1] = item.revenue || 0; // Đặt doanh thu vào đúng tháng
  //         }
  //       });
  //     }

  //     setMonthlyRevenue(defaultRevenue); // Ghi nhận dữ liệu đã xử lý
  //   } catch (error) {
  //     console.error("Lỗi khi lấy doanh thu: ", error.response || error);
  //     setMonthlyRevenue(Array(12).fill(0)); // Giá trị mặc định khi lỗi
  //   }
  // };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    console.log("Năm được chọn:", selectedYear);
    setYear(selectedYear);
  };

  // Thay đổi dữ liệu cho chart theo doanh thu đã lấy
  const seriescolumnchart = [{ name: "Doanh thu", data: monthlyRevenue }];

  const currentYear = new Date().getFullYear();

  return (
    <DashboardCard
      title={`Doanh thu trong năm ${currentYear}`}
      action={
        <Select
          id="year-dd"
          value={year}
          size="small"
          onChange={handleYearChange}
        >
          {[2022, 2023, 2024, 2025].map((yearOption) => (
            <MenuItem key={yearOption} value={yearOption}>
              Năm {yearOption}
            </MenuItem>
          ))}
        </Select>
      }
    >
      <Chart
        options={{
          chart: {
            type: "bar",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: "#adb0bb",
            toolbar: { show: true },
            height: 370,
          },
          colors: [primary],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "42%",
              borderRadius: 6,
            },
          },
          stroke: { show: true, width: 5, colors: ["transparent"] },
          dataLabels: { enabled: false },
          grid: { borderColor: "rgba(0,0,0,0.1)", strokeDashArray: 3 },
          yaxis: { tickAmount: 4 },
          xaxis: {
            categories: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
          tooltip: {
            theme: theme.palette.mode === "dark" ? "dark" : "light",
          },
        }}
        series={seriescolumnchart}
        type="bar"
        height="370px"
      />
    </DashboardCard>
  );
};

export default SalesOverview;
