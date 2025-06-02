import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { username, password } = inputs;

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // 🔥 이게 없으면 @RequestBody 파싱 실패 가능
          },
        }
      );


      const userInfo = response.data;
      login(userInfo);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패", error);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={onChange}
              placeholder="Enter your username"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.submit}>
            Login
          </button>
        </form>
        <div className={styles.field}>
          <Link to="/signup">회원가입하러 가기</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
