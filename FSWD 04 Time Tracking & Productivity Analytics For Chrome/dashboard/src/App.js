import React from "react";
import WeeklyChart from "./components/WeeklyChart";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Time Tracker Dashboard</h1>
      <WeeklyChart userId="guestUser" />
    </div>
  );
}

export default App;
