import { useState } from "react";
import Button from "react-bootstrap/Button";
import { GrPowerReset } from "react-icons/gr";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState();
  const categories = [
    "joy",
    "love",
    "embarrassment",
    "sympathy",
    "dissatisfaction",
    "anger",
    "sadness",
    "pain",
    "fear",
  ];

  const handleSelect = (value) => {
    if (value === selectedCategory) {
      handleReset();
    } else {
      setSelectedCategory(value);
    }
  };

  const handleReset = () => {
    setSelectedCategory();
  };

  return (
    <div>
      <div className="btn-group">
        {categories.map((item) => (
          <Button
            className="btn-categroies"
            style={{
              margin: ".25rem",
              borderRadius: "1.4rem",
            }}
            onClick={() => handleSelect(item)}
          >
            {item}
          </Button>
        ))}
        <Button
          style={{
            margin: ".25rem",
            borderRadius: "1.4rem",
            outline: "none",
            boxShadow: "none",
          }}
          onClick={() => handleReset()}
        >
          <GrPowerReset className="img-invert" />
        </Button>
      </div>
      <div style={{ color: "white" }}>{selectedCategory}</div>
    </div>
  );
}
