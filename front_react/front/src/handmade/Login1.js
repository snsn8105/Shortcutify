import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login1 = () => {
  const [inputs, setInputs] = useState({
    Id: "",
    Password: "",
  });

  const { Id, Password } = inputs;

  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {}
        <div className={styles.roundedBox} />

        {}
        <div className={styles.formContent}>
          <div className={styles.field}>
            <label htmlFor="Id">Id</label>
            <input type="text" id="Id" value={Id} onChange={onChange} />
          </div>

          <div className={styles.field}>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              value={Password}
              onChange={onChange}
            />
          </div>

          <div className={styles.field}>
            <button>login</button>
          </div>

          <div className={styles.field}>
            <Link to="/Signup">회원가입하러 가기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login1;
