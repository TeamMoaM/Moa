import "./CssReset.css";
import "./App.css";
import "./Common.css";
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
import BetaTest from "./pages/BetaTest.mobile";
import CreatePost from "./pages/CreatePost.mobile";
import Post from "./pages/Post.mobile";
import Community from "./pages/Community.mobile";
import MyPage from "./pages/MyPage.mobile";

import Login from "./pages/Login";
import Logo from "./icons/MoaLogo.svg";
import CreateReview from "./pages/CreateReview";
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

import BetaTestContextProvider from "./stores/betaTestStore";

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
    <BetaTestContextProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/app" element={<Main />} />
            <Route path="/app/beta-test" element={<BetaTest />} />
            <Route path="/app/beta-test/create" element={<CreatePost />} />
            <Route
              path="/app/community"
              element={<Community user={user} isAuth={isAuth} />}
            />
            <Route path="/app/my-page" element={<MyPage />} />
            <Route path="/app/beta-test/:id" element={<Post />} />
          </Routes>
        </div>
        <Footer />

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
      </Router>
    </BetaTestContextProvider>
  );
}

export default App;
