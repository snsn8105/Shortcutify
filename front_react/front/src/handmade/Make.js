import { useState } from "react";
import FileLoad from "./FileLoad";
import styles from "./Make.module.css";

const Make = () => {
  const [inputs, setInputs] = useState({
    Url: "",
    Designation: "",
  });

  const { Url, Designation } = inputs;

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
      <div className={styles.roundedBox1} />
      <div className={styles.roundedBox2}>
        {Designation && (
          <div className={styles.usertext}>
            <p>{Designation}</p>
          </div>
        )}
      </div>
      <div className={styles.container}>
        {}

        {}
        <div className={styles.formContent}>
          <div className={styles.field}>
            <label htmlFor="Url">Url</label>
            <input type="text" id="Url" value={Url} onChange={onChange} />
          </div>

          <div className={styles.field}>
            <label htmlFor="Designation">명칭</label>
            <input
              type="Designation"
              id="Designation"
              value={Designation}
              onChange={onChange}
            />
          </div>

          <div className={styles.field}>
            <button>취소</button> <button>저장</button> <button>확인</button>
          </div>

          <div>
            <FileLoad />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Make;
