import "./App.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import starEmpty from "../static/star-empty.svg";
import starFilled from "../static/star-filled.svg";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
// import "./display.css";
import "./kaomoji.css";

const NORMAL = "outline-info";
const LIKED = "outline-warning";
const CARD_NORMAL = "info";
const CARD_LIKED = "warning";
const image_style = {
  normal: {
    userSelect: "none",
    filter:
      "invert(93%) sepia(98%) saturate(4%) hue-rotate(46deg) brightness(108%) contrast(100%)",
  },
  liked: {
    userSelect: "none",
    filter:
      "invert(86%) sepia(52%) saturate(6954%) hue-rotate(359deg) brightness(100%) contrast(107%)",
  },
};

export default function Kaomoji(props) {
  const { userProfile, addFavorites, removeFavorites } = useAuth();
  const { currentTheme } = useTheme();
  const [isActive, setActive] = useState(props.active); // favorited items
  const [style, setStyle] = useState({
    backgroundColor: currentTheme.colors.cardBackground,
    color: currentTheme.colors.foreground,
    border: currentTheme.colors.cardBorder,
  });

  // copies to clipboard
  const actionSingleClick = () => {
    navigator.clipboard.writeText(props.data);
  };

  const actionDoubleClick = () => {
    setFavorite();
  };

  // determines single click vs double click
  function useClick(actionSingleClick, actionDoubleClick, delay = 200) {
    const [click, setClick] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (click === 1) actionSingleClick();
        setClick(0);
      }, delay);

      if (click === 2) actionDoubleClick();

      return () => clearTimeout(timer);
    }, [click]);

    return () => setClick((prev) => prev + 1);
  }

  const click = useClick(actionSingleClick, actionDoubleClick);

  // adds/
  const setFavorite = () => {
    const k = {
      id: props.id,
      name: props.data,
    };
    if (!isActive) {
      addFavorites(k);
      setStyle({
        backgroundColor: currentTheme.colors.cardSelectedBackground,
        color: currentTheme.colors.foreground,
        borderColor: currentTheme.colors.cardSelectedBorder,
      });
    } else {
      // remove from favs
      removeFavorites(k);
      setStyle({
        backgroundColor: currentTheme.colors.cardBackground,
        color: currentTheme.colors.foreground,
        borderColor: currentTheme.colors.cardBorder,
      });
    }
    setActive(!isActive);
  };

  return (
    <>
      {/* <Card
        style={{
          backgroundColor: currentTheme.colors.cardBackground,
          color: currentTheme.colors.foreground,
        }}
        className="kaomoji m-2 sm"
        border={isActive ? CARD_LIKED : CARD_NORMAL}
        onClick={click}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        <Card.Body
          className="kaomoji-body"
          style={
            {
            }
          }
        >
          <div id="name">
            <Card.Text>{props.data}</Card.Text>
          </div> */}
      {/* <i
            className="btn-star end-0"
            id="icon"
            variant={isActive ? LIKED : NORMAL}
            // style={style}
            onMouseEnter={(e) => {}}
            onClick={setFavorite}
          >
            <img
              className="button-img btn-link"
              src={isActive ? starFilled : starEmpty}
              alt=""
              stroke={currentTheme.colors.foreground}
              fill={isActive ? "gold" : "white"}
            ></img>
          // </i> */}
      {/* <div className="" onClick={setFavorite}>
            {isActive ? <BsStarFill /> : <BsStar />}
          </div>
        </Card.Body>
      </Card> */}
      <div className="kaomoji" style={style} onClick={click}>
        <div className="kaomoji-text-container">
          <div className="kaomoji-text">{props.data}</div>
        </div>
        <div className="kaomoji-star" onClick={setFavorite}>
          {isActive ? <BsStarFill color={"gold"} /> : <BsStar />}
        </div>
      </div>
    </>
  );
}
