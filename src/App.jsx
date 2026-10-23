import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Nav";

import Ciencia from "./pages/ciencia";
import Footer from "./components/Footer";
import Empresas from "./pages/empresas";
import EsParaVos from "./pages/es-para-vos";
import Contacto from "./pages/contacto";
import Faqs from "./pages/faqs";
import Suscription from "./pages/suscription";
import Sharp from "./pages/sharp/index";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ciencia" element={<Ciencia />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/es-para-vos" element={<EsParaVos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/subscription" element={<Suscription />} />
        <Route path="/sharp" element={<Sharp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
