import React, { useState } from "react";
import styles from "./Signup.module.css";

const Signup = () => {
  const [inputs, setInputs] = useState({
    Id: "",
    Password: "",
    Password_re: "",
    name: "",
    email: "",
  });

  const { Id, Password, Password_re, name, email } = inputs;

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
            <label htmlFor="Password_re">Password-retry</label>
            <input
              type="password_re"
              id="Password_Re"
              value={Password_re}
              onChange={onChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="name">name</label>
            <input type="name" id="name" value={name} onChange={onChange} />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">email</label>
            <input type="email" id="email" value={email} onChange={onChange} />
          </div>

          <div className={styles.field}>
            <button>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
