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
            <ul className='listItem item1'><Link to='/'><h2 className='subhead100'>Main</h2></Link></ul>
            <ul className='listItem item2'><Link to='/BetaTest/recentOrder'><h2 className='subhead100'>β - test</h2></Link></ul>
            <ul className='listItem item3'><Link to='/Community'><h2 className='subhead100'>Community</h2></Link></ul>
          </list>
          <div className='login'><Link to='/Login'><h3 className='body100'>로그인</h3></Link></div>
          <div className='register'><Link to='/Register'><h3 className='subhead100'>회원가입</h3></Link></div>
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