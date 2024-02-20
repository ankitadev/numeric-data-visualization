import "../pages/landingPage";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PaginationComponent from "./paginationComponent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function LineChartComponent() {
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
      <LineChart
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
            position: "insideBottomRight",
            offset: -2,
          }}
        />
        <YAxis
          unit="$"
          type="number"
          label={{ value: "Price", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Price"
          name="Monthly prices of Natural gas"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      {/* Render the pagination component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default LineChartComponent;
