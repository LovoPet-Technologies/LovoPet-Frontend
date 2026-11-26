import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/shared/navbar/NavBar";
import Footer from "./components/shared/Footer";
import HomePage from "./pages/HomePage";
import CTASection from "./pages/Ctasection";
import AuthPage from "./pages/AuthPage";
import AdminLogin from "./pages/AdminLogin";
import CheckEmail from "./pages/CheckEmail";
import PetShop from "./pages/PetShop";
import AnimalPharmacy from "./pages/AnimalPharmacy";
import VeterinarianApplicationPage from "./pages/VeterinarianApplicationPage";
import VendorApplicationPage from "./pages/VendorApplicationPage";
import VetLayout from "./components/layout/VetLayout";
import AdoptionPage from "./pages/AdoptionPage";
import ChatbotWidget from "./components/shared/ChatbotWidget";
import AdminDashboard from "./pages/AdminDashboard";
import VetAdminLogin from "./pages/VetAdminLogin";
import VetAdminDashboard from "./pages/VetAdminDashboard";
import MyConsultationsPage from "./pages/MyConsultationsPage";
import MyPetsPage from "./pages/MyPetsPage";
import MyProfilePage from "./pages/MyProfilePage";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const location = useLocation();

  const isVetAdminRoute = location.pathname.startsWith("/vet-admin");
  const isAdminRoute = location.pathname.startsWith("/admin") || isVetAdminRoute;
  const hideNavAndFooter = location.pathname === "/auth" || location.pathname === "/AuthCallback" || location.pathname === "/auth-callback" || isAdminRoute;

  return (
    <>
      {!hideNavAndFooter && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<CTASection />} />

        {/* Customer/vendor authentication */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/checkEmail" element={<CheckEmail />} />
        <Route path="/AuthCallback" element={<AuthCallback />} />
        <Route path="/auth-callback" element={<AuthCallback />} />

        {/* Admin authentication and temporary landing page */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Veterinary Admin portal */}
        <Route path="/vet-admin" element={<VetAdminLogin />} />
        <Route path="/vet-admin/login" element={<VetAdminLogin />} />
        <Route path="/vet-admin/dashboard" element={<VetAdminDashboard />} />

        {/* Customer Booking & Consultation */}
        <Route path="/vet" element={<VetLayout />} />
        <Route path="/consult-vet" element={<VetLayout />} />
        <Route path="/my-consultations" element={<MyConsultationsPage />} />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />

        <Route path="/pet-shop" element={<PetShop />} />
        <Route path="/adoption" element={<AdoptionPage />} />
        <Route path="/animal-pharmacy" element={<AnimalPharmacy />} />
        <Route path="/vet-apply" element={<VeterinarianApplicationPage />} />
        <Route path="/vendor-apply" element={<VendorApplicationPage />} />
      </Routes>

      {!hideNavAndFooter && <Footer />}

      {!isAdminRoute && <ChatbotWidget />}
    </>
  );
}

export default App;
