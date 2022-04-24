import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  setDoc,
  query,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function MyPageEduEdit({ user }) {
  var navigate = useNavigate();
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [time, setTime] = useState({
    timeStartYear: 0,
    timeStartMonth: 0,
    timeEndYear: 0,
    timeEndMonth: 0,
  });
  const [users, setUsers] = useState({});
  const [eduList, setEduList] = useState([]);
  const [eduState, setEduState] = useState("졸업"); //졸업 등등...
  onAuthStateChanged(auth, (currentUser) => {
    setUsers(currentUser);
  });
  const addData = async () => {
    try {
      if (users.displayName) {
        const usersInfoCollectionRef = collection(db, "userInfo");
        const userDocRef = doc(usersInfoCollectionRef, users.uid);
        const eduCollectionRef = collection(userDocRef, "education");
        await addDoc(eduCollectionRef, {
          school: {
            name: school,
            major: major,
            time: time,
            eduState: eduState,
          },
        });
        console.log("userinfo에 education 정보 올리기 성공!");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateTimeData = (e) => {
    setTime({
      ...time,
      [e.target.name]: +e.target.value,
    });
    console.log(time);
  };
  useEffect(() => {
    if (users.displayName) {
      const educationRef = query(
        collection(doc(collection(db, "userInfo"), users.uid), "education")
      );
      onSnapshot(educationRef, (snapshot) => {
        setEduList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [users]);
  return (
    <>
      <div className="popupInputField">
        <h3 className="subhead100">학교명</h3>
        <input
          className="event"
          placeholder="학교 이름"
          onChange={(event) => {
            setSchool(event.target.value);
          }}
        ></input>
      </div>
      <div className="popupInputField">
        <h3 className="subhead100">학과</h3>
        <input
          className="event"
          name="major"
          placeholder="전공"
          onChange={(e) => setMajor(e.target.value)}
        ></input>
      </div>
      <div className="popupInputField">
        <h3 className="subhead100">기간</h3>
        <input
          className="time"
          name="timeStartYear"
          placeholder="시작한 연도"
          type="number"
          min="1900"
          max="2100"
          onChange={updateTimeData}
        ></input>
        <h2 className="body100">~</h2>
        <input
          className="time"
          name="timeEndYear"
          placeholder="끝난 연도"
          type="number"
          min="1900"
          max="2100"
          onChange={updateTimeData}
        ></input>
      </div>
      <button className="addButton" onClick={addData}>
        <h3 className="subhead100">학력 추가하기</h3>
      </button>
      {/* {eduList && eduList.map((post)=>{
                return(
                <div>
                    {post.school.name}
                    {post.school.major}
                    {post.school.time.timeEndYear}
                </div>)
            })} */}
    </>
  );
}
export default MyPageEduEdit;
