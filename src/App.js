import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import TopicInput from './pages/TopicInput';
import Questionnaire from './pages/Questionnaire';
import FrameworkUploadEdit from './pages/FrameworkUpload';
import MyDatabase from './pages/MyDatabase';
import PaperGeneration from './pages/PaperGeneration';
import FinalPolish from './pages/FinalPolish';
import DigitalSummary from './pages/DigitalSummary'; // 导入新页面

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>毕业论文助手系统</h1>
        <nav>
          <Link to="/">首页</Link> |{' '}
          <Link to="/topic-input">输入主题</Link> |{' '}
          <Link to="/framework-upload-edit">上传和编辑框架</Link> |{' '}
          <Link to="/my-database">我的数据库</Link> |{' '}
          <Link to="/paper-generation">分段生成论文</Link> |{' '}
          <Link to="/final-polish">终稿修缮</Link> |{' '}
          <Link to="/digital-summary">数字化总结</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic-input" element={<TopicInput />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/framework-upload-edit" element={<FrameworkUploadEdit />} />
          <Route path="/my-database" element={<MyDatabase />} />
          <Route path="/paper-generation" element={<PaperGeneration />} />
          <Route path="/final-polish" element={<FinalPolish />} />
          <Route path="/digital-summary" element={<DigitalSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

