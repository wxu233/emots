import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Button from "react-bootstrap/Button";
import Bars from "./Bars";
import Login from "./Login";
import Signup from "./Signup";
import "./Sidebar.css";

export default function Sidebar() {
  const { currentUser, login, logout } = useAuth();
  const { currentTheme } = useTheme();

  const [sidebar, setSidebar] = useState(false);
  const [mobile, setMobile] = useState(false);

  // login settings
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isLogin, setLogin] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  const handleModalOpen = () => setModalShow(true);
  const handleModalClose = () => {
    setModalShow(false);
    setLogin(true);
    setError("");
  };

  const handleSignUp = () => setLogin(!isLogin);
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      console.log("User logged out");
    } catch {
      setError("Failed to log out");
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1065) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setSidebar(false);
        setMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className="sidebar"
        style={{ backgroundColor: currentTheme.colors.menuBackground }}
      >
        <div
          className="brand"
          style={{ color: currentTheme.colors.foreground }}
        >
          Emots
        </div>

        <Bars onClick={showSidebar} />

        {!mobile && (
          <>
            <div className="sidebar-links">
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              > */}
              <ul>
                {SidebarData.map((data, index) => {
                  return (
                    <li key={index} className={data.className}>
                      <Link className="sidebar-nav-link" to={data.path}>
                        {data.icon}
                        <span className="sidebar-text">{data.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {!currentUser && (
                <Button className="login-btn" onClick={handleModalOpen}>
                  Log in
                </Button>
              )}
              {currentUser && (
                <Button className="login-btn btn-danger" onClick={handleLogout}>
                  Log Out
                </Button>
              )}
              {/* </div> */}
            </div>
          </>
        )}

        {sidebar && (
          <>
            <div className="sidebar-links">
              <ul>
                {SidebarData.map((data, index) => {
                  return (
                    <li key={index} className={data.className}>
                      {/* <a> */}
                      <Link className="sidebar-nav-link" to={data.path}>
                        {data.icon}
                        <span className="sidebar-text">{data.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {!currentUser && (
              <Button className="login-btn" onClick={handleModalOpen}>
                Log in
              </Button>
            )}
            {currentUser && (
              <Button className="login-btn btn-danger" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </>
        )}
      </nav>

      {isLogin ? (
        <Login
          modalShow={modalShow}
          handleModalClose={handleModalClose}
          isLogin={isLogin}
          error={error}
          setError={setError}
          handleSignUp={handleSignUp}
        />
      ) : (
        <Signup
          modalShow={modalShow}
          error={error}
          setError={setError}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
}
