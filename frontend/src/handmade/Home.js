// src/Home.js
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className={styles.createButton} onClick={() => navigate("/Make")}>
        만들기
      </button>

      <div className={styles.field}>
        <Link to="/Login1">Login | </Link> <Link to="/Signup">Sign up</Link>{" "}
      </div>
    </div>
  );
};

export default Home;
