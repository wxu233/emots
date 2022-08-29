import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect } from "react";
import TopNav from "./nav";
import Display from "./Display";
import Sidebar from "./Sidebar";
import { AuthProvider } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function App() {
  const { currentTheme } = useTheme();

  // applies the theme even after scroll
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.colors.background;
  });

  return (
    <AuthProvider>
      <div
        className="App "
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
      >
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="content">
          <Display />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
