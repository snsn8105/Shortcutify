// src/handmade/Login1.js
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Login.module.css";

const Login1 = () => {
  const [inputs, setInputs] = useState({ Id: "", Password: "" });
  const { Id, Password } = inputs;

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 실제 API 호출 → userInfo 받아오기
    const userInfo = { name: Id };
    login(userInfo); // Context에 로그인 상태 저장
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="Id">Id</label>
            <input
              type="text"
              id="Id"
              value={Id}
              onChange={onChange}
              placeholder="Enter your id"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              value={Password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.submit}>
            Login
          </button>
        </form>
        <div className={styles.field}>
          <Link to="/Signup">회원가입하러 가기</Link>
        </div>
      </div>
    </div>
  );
};

export default Login1;
