// src/Make.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileLoad from "./FileLoad";
import styles from "./Make.module.css";

export default function Make() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ Url: "", Designation: "" });
  const [imageDataUrl, setImageDataUrl] = useState("");
  const { Url, Designation } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.id]: e.target.value });

  const handleSave = async () => {
    if (!imageDataUrl || !Designation) return;
    const blob = await (await fetch(imageDataUrl)).blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Designation}.png`;
    a.click();
    URL.revokeObjectURL(url);
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
        <div className={styles.formContent}>
          <div className={styles.field}>
            <label htmlFor="Url">Url</label>
            <input id="Url" value={Url} onChange={onChange} />
          </div>
          <div className={styles.field}>
            <label htmlFor="Designation">명칭</label>
            <input id="Designation" value={Designation} onChange={onChange} />
          </div>
          <div className={styles.field}>
            <button onClick={() => navigate("/")}>취소</button>
            <button onClick={handleSave}>저장</button>
            <button>확인</button>
          </div>

          <h1>결과물 미리보기</h1>
          <FileLoad onImageChange={setImageDataUrl} />
        </div>
      </div>
    </div>
  );
}
