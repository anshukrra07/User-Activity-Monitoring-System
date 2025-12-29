import { BrowserRouter, Routes, Route } from "react-router-dom";
import AISurveillanceScreen from "./AISurveillanceScreen";
import DashboardGuide from "./DashboardGuide";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AISurveillanceScreen />} />
        <Route path="/DashboardGuide" element={<DashboardGuide />} />
      </Routes>
    </BrowserRouter>
  );
}