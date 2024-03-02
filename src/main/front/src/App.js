import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./page/Header";
import Footer from "./page/Footer";

import MainPage from "./page/mainPage/MainPage";
import Login from "./page/login/Login";
import Join from "./page/login/Join";
import Easy from "./page/study/StudyPage";
import TestPage from "./page/test/TestPage";
import ResultPage from "./page/test/ResultPage";
import RecordPage from "./page/mypage/RecordPage";
import FavoritesList from "./page/mypage/FavoritesList";
import Rank from "./page/rankPage/Rank";
import TokenInfoProvider from "./component/TokenInfoProvider";

function App() {
  return (
    <TokenInfoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/study/easy" element={<Easy/>} />
          <Route path="/test/easy" element={<TestPage />}/>
          <Route path="/result" element={<ResultPage />}/>
          <Route path="/mypage/record" element={<RecordPage />} />
          <Route path="/mypage/favorites" element={<FavoritesList />} />
          <Route path="/rank" element={<Rank />}/>
        </Routes>

        <Footer />
      </BrowserRouter>
    </TokenInfoProvider>
  );
}

export default App;
