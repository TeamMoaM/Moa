import './CssReset.css'
import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {onAuthStateChanged,signOut,setPersistence,browserSessionPersistence} from 'firebase/auth';
import {auth} from './firebase-config';
import Main from './pages/Main'; 
import Login from './pages/Login';
import Community from './pages/Community';
import BetaTest_recent from './pages/BetaTest_recent';
import BetaTest_late from './pages/BetaTest_late';
import Register from './pages/Register';
import Logo from './icons/MoaLogo.svg';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import ReviewPost from './pages/ReviewPost';
import MyPage from './pages/MyPage';
import MyPageEdit from './pages/MyPageEdit';

function App() {
  const [isAuth,setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const signUserOut = () => {
    signOut(auth).then(()=>{
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = "/";
    });
  }
  setPersistence(auth, browserSessionPersistence).then(()=>{console.log("browser session success")});
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
    if(currentUser.displayName){
      setIsAuth(true);
    }
  })
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
          {!isAuth?
          <>
            <div className='login'><Link to='/Login'><h3 className='body100'>로그인</h3></Link></div>
            <div className='register'><Link to='/Register'><h3 className='subhead100'>회원가입</h3></Link></div>
          </>
          :<>
            <div className='login'><Link onClick={()=>{signUserOut()}}to='/Login'><h3 className='body100'>로그아웃</h3></Link></div>
            <div className='register'><Link to='/MyPage'><h3 className='subhead100'>{user.displayName}</h3></Link></div>
          </>
          }
         
        </div>
      </nav>

      <div className='divider'></div>
      
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>} ></Route>
        <Route path="/MyPage" element={<MyPage user={user}/>} ></Route>
        <Route path="/MyPage/edit" element={<MyPageEdit user={user} isAuth={isAuth}/>}></Route>
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
        <Route path="/post/:roomId" element={<Post user={user}/>}></Route>
        <Route path="/post/reviewpost/:roomId" element={<ReviewPost />}></Route>
        <Route path="/Community" element={<Community/>}></Route>
        <Route path="/Register" element={<Register setIsAuth={setIsAuth}/>}></Route>
        <Route path="/CreatePost" element={<CreatePost/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;