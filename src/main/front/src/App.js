import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./page/Header";
import Footer from "./page/Footer";

import MainPage from "./page/mainPage/MainPage";
import Login from "./page/login/Login";
import Join from "./page/login/Join";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<MainPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
