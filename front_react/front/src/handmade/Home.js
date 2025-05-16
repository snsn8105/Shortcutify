// src/handmade/Home.js
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import SpinnerVideo from "./home_text.mp4";

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.25; // 재생 속도를 1/4배로 느리게
    }
  }, []);

  return (
    <div>
      <div className={styles.rectangleBoxUp} />
      <div className={styles.rectangleBoxDown} />

      <video
        ref={videoRef}
        className={styles.spinnerVideo}
        src={SpinnerVideo}
        autoPlay
        loop
        muted
      />

      <button className={styles.createButton} onClick={() => navigate("/make")}>
        만들기
      </button>

      <div className={styles.field}>
        <Link to="/login1">[Login]</Link>
        <Link to="/signup"> [Sign up]</Link>
      </div>
    </div>
  );
}
