// src/handmade/Home.js
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Home.module.css";
import gif from "./backn.gif";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {/* 1) 상단 고정 헤더 */}
      <header className={styles.header}>
        <div className={styles.logo}>ShortCutify</div>
        <nav className={styles.nav}>
          {user ? (
            <>
              <span className={styles.welcome}>어서오세요, {user.username}님!</span>
              <button
                className={`${styles.navButton} ${styles.logoutButton}`}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${styles.navLink} ${styles.loginButton}`}>
                Login
              </Link>
              <Link to="/signup" className={`${styles.navLink} ${styles.signupButton}`}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* 2) 헤더 아래 본문 */}
      <div className={styles.content}>
        {/* 배경 도형 */}
        <div className={styles.rectangleBoxUp} />
        <div className={styles.rectangleBoxDown} />

        {/* 중앙의 GIF 애니메이션 */}
        <img className={styles.gif} src={gif} alt="background loop" />

        {/* 바로 만들기 버튼 */}
        <button
          className={styles.createButton}
          onClick={() => navigate("/make")}
          disabled={!user}
        >
          바로 만들기
        </button>

        {/* 기록 불러오기 버튼 */}
        <button
          className={styles.createButton}
          onClick={() => navigate("/Record")}
          disabled={!user}
        >
          기록 불러오기
        </button>
      </div>
    </>
  );
}
