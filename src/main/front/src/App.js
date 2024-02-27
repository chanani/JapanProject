import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./page/Header";
import Footer from "./page/Footer";

import MainPage from "./page/mainPage/MainPage";
import Login from "./page/login/Login";
import Join from "./page/login/Join";
import Easy from "./page/study/Easy";
import TestPage from "./page/test/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/study/easy" element={<Easy/>} />
        <Route path="/test/easy" element={<TestPage />}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
