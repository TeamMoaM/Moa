import "./CssReset.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import Main from "./pages/Main.mobile";
import Login from "./pages/Login";
import Community from "./pages/Community";
import BetaTest_old from "./pages/BetaTest_old";
import BetaTest_new from "./pages/BetaTest_new";
import Logo from "./icons/MoaLogo.svg";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import CreateReview from "./pages/CreateReview";
import MyPage from "./pages/MyPage";
import Signup from "./pages/Signup";
import MyPageInfoEdit from "./pages/MyPageInfoEdit";
import AccountSetting from "./pages/AccountSetting";
import defaultprofileImg from "./img/communityImg/defaultprofile.svg";
import bronzeMedal from "./img/medals/bronzeMedal.svg";
import silverMedal from "./img/medals/silverMedal.svg";
import goldMedal from "./img/medals/goldMedal.svg";
import { doc, getDoc } from "firebase/firestore";
import Header from "./pages/Header.mobile";
import Footer from "./pages/Footer.mobile";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [list, setList] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [communityBool, setCommunityBool] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  setPersistence(auth, browserSessionPersistence).then(() => {});

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      getDoc(doc(db, "userInfo", currentUser.uid)).then((docsnap) => {
        setDisplayName(docsnap.data().name);
      });
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/app" element={<Main setUser={setUser} />} />
      </Routes>
      {/* 
        
        <Route
          path="/Login"
          element={<Login setIsAuth={setIsAuth} setList={setList} />}
        ></Route>
        <Route
          path="/Signup"
          element={<Signup setIsAuth={setIsAuth} setList={setList} />}
        ></Route>
        <Route
          path="/MyPage"
          element={<MyPage setList={setList} user={user} />}
        ></Route>
        <Route
          path="/BetaTest/recentOrder"
          element={<BetaTest_new setList={setList} />}
        ></Route>
        <Route
          path="/BetaTest/lateOrder"
          element={<BetaTest_old setList={setList} />}
        ></Route>
        <Route
          path="/post/:roomId"
          element={<Post isAuth={isAuth} user={user} setList={setList} />}
        ></Route>
        <Route
          path="/post/createreview/:roomId"
          element={
            <CreateReview isAuth={isAuth} user={user} setList={setList} />
          }
        ></Route>
        <Route
          path="/Community"
          element={
            <Community
              setCommunityBool={setCommunityBool}
              setList={setList}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
          }
        ></Route>
        <Route
          path="/CreatePost"
          element={<CreatePost isAuth={isAuth} user={user} setList={setList} />}
        ></Route>
        <Route path="/mypageInfoEdit" element={<MyPageInfoEdit />}></Route>
        <Route path="/accountSetting" element={<AccountSetting />}></Route>
      */}
      {/* {communityBool ? <></> : <div className="footer"></div>} */}
      <Footer />
    </Router>
  );
}

export default App;
