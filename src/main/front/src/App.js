import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, CssBaseline } from '@mui/material';

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
import Search from "./page/searchPage/SearchPage";
import TokenInfoProvider from "./component/TokenInfoProvider";
import Quiz from "./component/Quiz";
import RecordDetails from "./page/test/RecordDetails";
import ChatAi from "./page/chatAiPage/ChatAi";
import AddWordPage from "./page/amindPage/AddWordPage";
import AddNoticePage from "./page/amindPage/AddNoticePage";
import NoticePage from "./page/notice/NoticePage";
import Mypage from "./page/mypage/Mypage";
import Withdrawal from "./page/mypage/Withdrawal";
import Policy from "./page/policy/Policy";
import Inquiry from "./page/inquiryPage/Inquiry";
import InquiryWrite from "./page/inquiryPage/InquiryWrite";
import theme from "./component/theme";
import InquiryDetail from "./page/inquiryPage/InquiryDetail";
import AddInquiryComment from "./page/amindPage/AddInquiryComment";
import AddInquiryCommentWrite from "./page/amindPage/AddInquiryCommentWrite";
import SchoolPage from "./page/schoolPage/SchoolPage";
import TranslatorPage from "./page/translatorPage/TranslatorPage";
import AddWeekWordPage from "./page/amindPage/AddWeekWordPage";
import NoticeDetail from "./page/notice/NoticeDetail";

function App() {
  return (
      <TokenInfoProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <BrowserRouter>
            <Header />
            <ToastContainer
                position="top-right" // 알람 위치 지정
                autoClose={3000} // 자동 off 시간
                hideProgressBar={false} // 진행시간바 숨김
                closeOnClick // 클릭으로 알람 닫기
                rtl={false} // 알림 좌우 반전
                pauseOnFocusLoss // 화면을 벗어나면 알람 정지
                draggable // 드래그 가능
                pauseOnHover // 마우스를 올리면 알람 정지
                theme="light"
                // limit={1} // 알람 개수 제한
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/study/:level" element={<Easy/>} />
              <Route path="/test/:level" element={<TestPage />}/>
              <Route path="/result" element={<ResultPage />}/>
              <Route path="/mypage/record" element={<RecordPage />} />
              <Route path="/mypage/favorites" element={<FavoritesList />} />
              <Route path="/search" element={<Search />}/>
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/recordDetails" element={<RecordDetails />}/>
              <Route path="/chatAi" element={<ChatAi/>} />
              <Route path="/notice" element={<NoticePage/>} />
              <Route path="/admin/addWord" element={<AddWordPage />} />
              <Route path="/admin/addNotice" element={<AddNoticePage />} />
              <Route path="/admin/addWeekWord" element={<AddWeekWordPage />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/withdrawal" element={<Withdrawal />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/inquiry" element={<Inquiry />} />
              <Route path="/inquiryWrite" element={<InquiryWrite />} />
              <Route path="/inquiryDetail" element={<InquiryDetail />} />
              <Route path="/addInquiryComment" element={<AddInquiryComment />} />
              <Route path="/AddInquiryCommentWrite" element={<AddInquiryCommentWrite />} />
              <Route path="/schoolPage" element={<SchoolPage />} />
              <Route path="/translator" element={<TranslatorPage />}/>
              <Route path="/notice-detail" element={<NoticeDetail />}/>
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </TokenInfoProvider>

  );
}

export default App;
