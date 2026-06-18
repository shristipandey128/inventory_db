import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Customers from "./pages/Customers";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Products</Link>
        {" | "}
        <Link to="/customers">Customers</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;