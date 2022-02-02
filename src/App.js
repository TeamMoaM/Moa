import './CssReset.css'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main'; 
import Login from './pages/Login';
import Community from './pages/Community';
import BetaTest_recent from './pages/BetaTest_recent';
import BetaTest_late from './pages/BetaTest_late';
import Register from './pages/Register';
import Logo from './icons/MoaLogo.svg';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {
  return(
    <Router>
      <nav>
        <div className='navWrap'>
          <Link to='/'><img className='logoImage' src={Logo}/></Link>
          <list className='menuList'>
            <ul className='listItem item1'><Link to='/'>메인페이지</Link></ul>
            <ul className='listItem item2'><Link to='/BetaTest/recentOrder'>베타테스트</Link></ul>
            <ul className='listItem item3'><Link to='/Community'>커뮤니티</Link></ul>
          </list>
          <div className='login'><Link to='/Login'>로그인</Link></div>
          <div className='register'><Link to='/Register'>회원가입</Link></div>
        </div>
      </nav>

      <div className='divider'></div>

      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/Login" element={<Login />} ></Route>
        <Route path="/BetaTest/recentOrder" element={<BetaTest_recent/>}></Route>
        <Route path="/BetaTest/recentOrder/1" element={<BetaTest_recent currentPage={1}/>}></Route>
        <Route path="/BetaTest/recentOrder/2" element={<BetaTest_recent currentPage={2}/>}></Route>
        <Route path="/BetaTest/recentOrder/3" element={<BetaTest_recent currentPage={3}/>}></Route>
        <Route path="/BetaTest/recentOrder/4" element={<BetaTest_recent currentPage={4}/>}></Route>
        <Route path="/BetaTest/recentOrder/5" element={<BetaTest_recent currentPage={5}/>}></Route>
        <Route path="/BetaTest/lateOrder" element={<BetaTest_late currentPage={1}/>}></Route>
        <Route path="/BetaTest/lateOrder/1" element={<BetaTest_late currentPage={1}/>}></Route>
        <Route path="/BetaTest/lateOrder/2" element={<BetaTest_late currentPage={2}/>}></Route>
        <Route path="/BetaTest/lateOrder/3" element={<BetaTest_late currentPage={3}/>}></Route>
        <Route path="/BetaTest/lateOrder/4" element={<BetaTest_late currentPage={4}/>}></Route>
        <Route path="/BetaTest/lateOrder/5" element={<BetaTest_late currentPage={5}/>}></Route>
        <Route path="/post/:roomId" element={<Post/>}></Route>
        <Route path="/Community" element={<Community/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/CreatePost" element={<CreatePost/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;