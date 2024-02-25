import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import Home from "./component/Home";
import CartDetails from "./component/CartDetails";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDetails />} />
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
