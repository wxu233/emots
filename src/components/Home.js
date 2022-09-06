import { db } from "./firebase";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Dashboard from "./Dashboard";
import Kaomoji from "./Kaomoji";
import Container from "react-bootstrap/Container";
import "./display.css";

export default function Home() {
  const { currentUser } = useAuth();
  const { currentTheme } = useTheme();
  const dbRef = collection(db, "kaomojis");

  // query
  const q = query(dbRef, orderBy("likes", "desc"), limit(75));

  // resolves the query
  // use snapshot to access document id
  const [, , , snapshot] = useCollectionData(q); // use snapshot

  // TODO: infinity scroll when button is clicked
  return (
    <div className="display-container">
      {currentUser && <Dashboard />}
      <div>
        <div
          className="section-header"
          style={{
            color: currentTheme.colors.foreground,
          }}
        >
          Popular emots
        </div>
        console.log(snapshot)
        <Container className="card-deck">
          {snapshot &&
            snapshot.docs.map((doc) => (
              <Kaomoji
                key={doc.id}
                id={doc.id}
                data={doc.data().name}
                active={false}
              />
            ))}
        </Container>
      </div>
    </div>
  );
}
