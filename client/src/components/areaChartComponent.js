import "../pages/landingPage";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PaginationComponent from "./paginationComponent";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AreaChartComponent() {
  const [naturalGasPrices, setNaturalGasPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const fetchEmployees = async () => {
      const { data } = await axios.get(`/api/getall`, config).catch((error) => {
        console.error("Error fetching data:", error);
      });

      setNaturalGasPrices(data);
    };
    fetchEmployees();
  }, []);

  const totalItems = naturalGasPrices.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = naturalGasPrices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div id="landingDiv">
      <AreaChart
        width={1300}
        height={700}
        data={currentItems}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Month"
          label={{
            value: "Year-Month",
            position: "bottom",
            offset: -2,
          }}
        />
        <YAxis
          unit="$"
          type="number"
          label={{ value: "Price", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Price"
          stroke="#8884d8"
          name="Monthly prices of Natural gas"
          fill="#8884d8"
        />
      </AreaChart>
      {/* Render the pagination component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AreaChartComponent;
