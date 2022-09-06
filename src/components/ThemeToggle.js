import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";
import "./themetoggle.css";

export default function ThemeToggle(props) {
  const { currentTheme, changeTheme } = useTheme();

  const handleToggle = () => {
    console.log("toggle button clicked");
    if (currentTheme.name === "dark") {
      changeTheme("light");
      // TODO change user pref in database
    } else if (currentTheme.name === "light") {
      changeTheme("dark");
    } else {
      console.log("unknow theme");
    }
  };

  return (
    <div className="toggle-wrapper">
      <input id="switch" type="checkbox" onClick={() => handleToggle()} />
      <label
        className="toggle-label"
        htmlFor="switch"
        onClick={() => props.onChange}
      >
        <RiSunFill
          className="sun"
          style={{
            fontSize: "18px",
            color: "gold",
            transition: "0.8s",
          }}
        />
        <RiMoonClearFill
          className="moon"
          style={{
            fontSize: "18px",
            color: "#fff",
            transition: "0.8s",
          }}
        />
        <span className="ball"></span>
      </label>
    </div>
  );
}
