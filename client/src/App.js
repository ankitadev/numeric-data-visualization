import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="app">
        <Routes>
        <Route path="/chart" element={<LandingPage />} />
        </Routes>
      </main>
  <Footer />
  </Router>
  );
}

export default App;