import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import BookingPage from "./pages/BookingPage";
import BookingHistory from "./pages/BookingHistory";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import CourtsAdmin from "./admin/CourtsAdmin";
import EquipmentAdmin from "./admin/EquipmentAdmin";
import CoachesAdmin from "./admin/CoachesAdmin";
import BookingsAdmin from "./admin/BookingsAdmin";
import PricingRules from "./admin/PricingRules";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/history" element={<BookingHistory />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<BookingsAdmin />} />
          <Route path="courts" element={<CourtsAdmin />} />
          <Route path="equipment" element={<EquipmentAdmin />} />
          <Route path="coaches" element={<CoachesAdmin />} />
          <Route path="pricing" element={<PricingRules />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
