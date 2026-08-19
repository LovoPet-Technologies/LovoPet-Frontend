import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/shared/navbar/NavBar";
import HomePage from "./pages/HomePage";
import CTASection from "./pages/Ctasection";
import AuthPage from "./pages/AuthPage";
import PetShop from "./pages/PetShop";
import AnimalPharmacy from "./pages/AnimalPharmacy";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/auth" && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<CTASection />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/pet-shop" element={<PetShop />} />
        <Route path="/animal-pharmacy" element={<AnimalPharmacy />} />
      </Routes>
    </>
  );
}

export default App;
