import { useState, useEffect } from "react";
import { db } from "./firebase";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Kaomoji from "./Kaomoji";
import Dashboard from "./Dashboard";
import Container from "react-bootstrap/Container";
import { useAuth } from "../context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Categories from "./Categories";
import Favorites from "./Favorites";
import "./display.css";

export default function Display() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}
