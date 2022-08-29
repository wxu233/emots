import { useState } from "react";
import Button from "react-bootstrap/Button";

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

  return (
    <div>
      {categories.map((item) => (
        <Button bg="dark" text="white">
          {item}
        </Button>
      ))}
    </div>
  );
}
