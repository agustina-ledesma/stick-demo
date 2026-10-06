import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Nav";
import Product from "./pages/products/[product]/index";
import System from "./pages/system/index";
import Oasis from "./pages/oasis/index";
import Ciencia from "./pages/ciencia";
import Footer from "./components/Footer";
import Empresas from "./pages/empresas";
import EsParaVos from "./pages/es-para-vos";
import Contacto from "./pages/contacto";
import Faqs from "./pages/faqs";
import Suscription from "./pages/suscription";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:product" element={<Product />} />
        <Route path="/system" element={<System />} />
        <Route path="/oasis" element={<Oasis />} />
        <Route path="/ciencia" element={<Ciencia />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/es-para-vos" element={<EsParaVos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/subscription" element={<Suscription />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
