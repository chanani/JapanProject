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
import Quiz from "./component/Quiz";
import RecordDetails from "./page/test/RecordDetails";
import ChatAi from "./page/chatAiPage/ChatAi";
import AddWordPage from "./page/amindPage/AddWordPage";
import AddNoticePage from "./page/amindPage/AddNoticePage";
import NoticePage from "./page/notice/NoticePage";

function App() {
  return (
    <TokenInfoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/study/:level" element={<Easy/>} />
          <Route path="/test/:level" element={<TestPage />}/>
          <Route path="/result" element={<ResultPage />}/>
          <Route path="/mypage/record" element={<RecordPage />} />
          <Route path="/mypage/favorites" element={<FavoritesList />} />
          <Route path="/rank" element={<Rank />}/>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/recordDetails" element={<RecordDetails />}/>
          <Route path="/chatAi" element={<ChatAi/>} />
          <Route path="/rank" element={<Rank/>} />
          <Route path="/notice" element={<NoticePage/>} />
          <Route path="/admin/addWord" element={<AddWordPage />} />
          <Route path="/admin/addNotice" element={<AddNoticePage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </TokenInfoProvider>
  );
}

export default App;
