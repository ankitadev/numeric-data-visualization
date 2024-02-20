import "./landingPage.css";
import React from "react";
import { useState } from "react";

import LineChartComponent from "../components/lineChartComponent";
import AreaChartComponent from "../components/areaChartComponent";
import BarChartComponent from "../components/barChartComponent";
import { Container, Button } from "react-bootstrap";

function LandingPage() {
  const [show, setShow] = useState('areaChart');

  return (
    <div className="LandingPageApp">

      <Button onClick={() => { setShow('areaChart') }}>Area Chart</Button>
    <Button onClick={() => { setShow('barChart') }}>Bar Chart</Button>
    <Button onClick={() => { setShow('lineChart') }}>Line Chart</Button>

      <Container className="LandingPageApp">

    {
      (show === 'areaChart') ? <AreaChartComponent /> : null
    }
    {
      (show === 'barChart') ? <BarChartComponent /> : null
    }
    {
      (show === 'lineChart') ? <LineChartComponent /> : null
    }
    </Container>
    </div>
  );
}

export default LandingPage;
