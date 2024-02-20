import "../pages/landingPage";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PaginationComponent from "./paginationComponent";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const colors = scaleOrdinal(schemeCategory10).range();

function BarChartComponent() {
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

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3} 
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div id="barChartDiv">
      <BarChart
        width={1300}
        height={720}
        data={currentItems}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
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
        <Bar
          dataKey="Price"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {currentItems.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
      {/* Render the pagination component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default BarChartComponent;
