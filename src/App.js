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
import CreateReview from './pages/CreateReview';
import MyPage from './pages/MyPage';
import MyPageEdit from './pages/MyPageEdit';
import defaultprofileImg from './icons/userdefaultimg.svg';
import CreateCommunity from './pages/CreateCommunity';

function App() {
  const [isAuth,setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [list,setList] = useState(1);
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
          <div className="wrapLogoandMenu">
            <Link to='/' onClick={()=>{setList(1)}}><img className='logoImage' src={Logo}/></Link>
            <list className='menuList'>
              <ul className='listItem item1'><Link onClick={()=>{setList(1)}}to='/'>{list==1?<h2 id='listClicked1' className='subhead100'>Main</h2>:<h2 id='listNotClicked' className='subhead100'>Main</h2>}</Link></ul>
              <ul className='listItem item2'><Link onClick={()=>{setList(2)}}to='/BetaTest/recentOrder'>{list==2?<h2 id="listClicked2" className='subhead100'>β - test</h2>:<h2 id="listNotClicked" className='subhead100'>β - test</h2>}</Link></ul>
              <ul className='listItem item3'><Link onClick={()=>{setList(3)}}to='/Community'>{list==3?<h2 id="listClicked3" className='subhead100'>Community</h2>:<h2 id="listNotClicked" className='subhead100'>Community</h2>}</Link></ul>
            </list>
          </div>
          
          {!isAuth?
          <div className="registerAndLogin">
            <div className='login'><Link to='/Login'><h3 className='body100'>로그인</h3></Link></div>
            <div className='register'><Link to='/Register'><h3 className='subhead100'>회원가입</h3></Link></div>
          </div>
          :<div className="registerAndLogins">
            <div className='register'><Link className="registerLink"to='/MyPage'><img src={defaultprofileImg}/><h3 id="logineddisplayName"className='subhead100'>{user.displayName}</h3></Link></div>
            <div className='login'><Link onClick={()=>{signUserOut()}}to='/Login'><h3 className='body100'>로그아웃</h3></Link></div>
          </div>
          }
         
        </div>
      </nav>

      <div className='divider'></div>
      
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>} ></Route>
        <Route path="/MyPage" element={<MyPage setList={setList}user={user}/>} ></Route>
        <Route path="/BetaTest/recentOrder" element={<BetaTest_recent setList={setList}/>}></Route>
        <Route path="/BetaTest/lateOrder" element={<BetaTest_late />}></Route>
        <Route path="/post/:roomId" element={<Post isAuth={isAuth}user={user}/>}></Route>
        <Route path="/post/createreview/:roomId" element={<CreateReview user={user}/>}></Route>
        <Route path="/Community" element={<Community setList={setList} isAuth={isAuth}/>}></Route>
        <Route path='/CreateCommunity' element={<CreateCommunity user={user}/>}></Route>
        <Route path="/Register" element={<Register setIsAuth={setIsAuth}/>}></Route>
        <Route path="/CreatePost" element={<CreatePost user={user}/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;