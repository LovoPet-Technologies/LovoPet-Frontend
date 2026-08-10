import { Routes, Route } from "react-router-dom";

import NavBar from "./components/shared/navbar/NavBar";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
