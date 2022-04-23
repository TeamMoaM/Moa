import React from "react";

function TimeCal({ time }) {
  const currentTime = new Date().getTime() / 1000;
  const timeGap = currentTime - time;
  let displayTime = "방금";
  if (timeGap < 60) {
    displayTime = "방금";
  } else if (60 <= timeGap && timeGap < 3600) {
    const minute = Math.floor(timeGap / 60);
    displayTime = String(minute) + "분 전";
  } else if (3600 <= timeGap && timeGap < 86400) {
    const hour = Math.floor(timeGap / 3600);
    displayTime = String(hour) + "시간 전";
  } else if (86400 <= timeGap && timeGap < 2678400) {
    const day = Math.floor(timeGap / 3600 / 24);
    displayTime = String(day) + "일 전";
  } else if (2678400 <= timeGap && timeGap < 32140800) {
    const month = Math.floor(timeGap / 3600 / 24 / 31);
    displayTime = String(month) + "달 전";
  } else {
    displayTime = "오래됨";
  }
  return <h2 className="caption100">{displayTime}</h2>;
}

export default TimeCal;
