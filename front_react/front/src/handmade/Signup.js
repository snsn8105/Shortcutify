// src/handmade/Signup.js
import { useState } from "react";
import styles from "./Signup.module.css";

const Signup = () => {
  const [inputs, setInputs] = useState({
    Id: "",
    Password: "",
    Password_re: "",
    name: "",
    email: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const { Id, Password, Password_re, name, email } = inputs;

  const onChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 API 호출
    setShowAlert(true);
  };

  const handleConfirm = () => {
    setShowAlert(false);
    // 추가 로직…
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>회원가입</h1>

        <form className={styles.formContent} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="Id">아이디</label>
            <input
              type="text"
              id="Id"
              value={Id}
              onChange={onChange}
              placeholder="영문/숫자 4~12자"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Password">비밀번호</label>
            <input
              type="password"
              id="Password"
              value={Password}
              onChange={onChange}
              placeholder="8자 이상 입력"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Password_re">비밀번호 확인</label>
            <input
              type="password"
              id="Password_re"
              value={Password_re}
              onChange={onChange}
              placeholder="다시 한 번 입력"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="실명을 입력하세요"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="example@domain.com"
              required
            />
          </div>

          <div className={styles.field}>
            <button type="submit" className={styles.submitButton}>
              Sign up
            </button>
          </div>
        </form>
      </div>

      {showAlert && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <p className={styles.modalMessage}>회원 가입이 완료되었습니다!</p>
            <button className={styles.confirmButton} onClick={handleConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
